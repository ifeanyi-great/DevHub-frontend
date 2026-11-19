import { useState, useEffect, useRef } from "react"
import PostCard from "../components/PostCard.jsx"
import Pagination from "../components/Pagination.jsx"
import { AuthContext } from "../context/AuthContext.jsx"


function Home() {
  const [posts, setPosts] = useState([])
  const [postIsLoading, setPostIsLoading] = useState(true)
  const [postError, setPostError] =  useState(null)
  const [postPagination, setPostPagination] = useState(null)
  const abortControllerRef = useRef(null)

  function fetchPosts(uri, updateHistory = true, replaceHistory = false) {

    // 1. Cancel the previous request
    if (abortControllerRef.current) {
        abortControllerRef.current.abort()
    }

    // 2. Create a controller for this request
    const controller = new AbortController()
    abortControllerRef.current = controller

    setPostIsLoading(true)
    setPostError(null)

    // 3. Make the initial request
    fetch(uri, {
        signal: controller.signal,
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed')
            }
            return response.json()
        })

        // 4. Inspect the response and recover if necessary
        .then(data => {

            // Ignore outdated responses
            if (controller !== abortControllerRef.current) return

            // Check whether the requested page exists
            if (data.meta.current_page > data.meta.last_page) {

                updateHistory = false
                replaceHistory = true

                // Request the last available page
                return fetch(data.links.last, {
                    signal: controller.signal,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Recovery request failed')
                        }

                        return response.json()
                    })
            }

            // Pass a normal response to the next .then()
            return data
        })

        // 5. Process the final response
        .then(data => {

            if (!data) return

            // Prevent outdated responses from updating React
            if (controller !== abortControllerRef.current) return

            setPosts(data.data)

            setPostPagination({
                meta: data.meta,
                links: data.links
            })

            // Synchronize the browser URL
            if (updateHistory) {
                window.history.pushState({}, '', `?page=${data.meta.current_page}`)
            } 
            else if (replaceHistory) {
                window.history.replaceState({}, '', `?page=${data.meta.current_page}`)
        
            }
        })

        // 6. Handle errors
        .catch(error => {

            // Ignore errors from outdated requests
            if (controller !== abortControllerRef.current) return

            // Ignore intentional cancellation
            if (error.name === 'AbortError') return

            console.error(error)
            setPostError('Failed to load posts.')
        })
        // 7. Finish loading only for the latest request
        .finally(() => {

            if (abortControllerRef.current === controller) {
                setPostIsLoading(false)
            }
        })
} 

  function loadPageFromUrl() {
 // Read the current page number from the URL query parameters and fetch the corresponding posts
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page') ?? 1) 

    if(Number.isNaN(page) || !Number.isInteger(page) || page <= 0){
      window.history.replaceState({}, '', '?page=1')
      fetchPosts('http://devhub.test/api/posts?page=1', false, true)
      return
    }

    fetchPosts(`http://devhub.test/api/posts?page=${page}`, false)
}

 useEffect(()=> {
   loadPageFromUrl()
   window.addEventListener('popstate', loadPageFromUrl)

   return () => {
  window.removeEventListener('popstate', loadPageFromUrl)
   }
 }, [])
   
 return (
<>
      {
        postIsLoading
        ? <span className="flex items-center justify-center h-screen dark:text-white">Loading Posts...</span>
        :postError
            ?<>
            <span className="flex items-center justify-center h-screen text-sm text-red-600">{postError}</span>
            <button onClick={loadPageFromUrl}>Try Again</button>
            </> 
            :posts.length === 0
              ? <p className="flex items-center justify-center h-screen dark:text-white">No posts yet. Be the first to share one!</p> 
                :<div className="max-w-3xl mx-auto px-4">
                  {posts.map(post => {
                  return <PostCard 
                  key={post.id}  id={post.id}
                  title={post.title} description={post.description} difficulty={post.difficulty} codeSnippet={post.code_snippet}
                  user={post.user?.name ?? 'Deleted user'} userProfile={post.user?.profile_picture}
                  />})
                  }
                </div>
      } 

{ 
!postIsLoading && !postError && postPagination && posts.length > 0 
 &&
<Pagination 
     nextUrl={postPagination.links.next} 
     prevUrl={postPagination.links.prev}
     onNext={() => fetchPosts(postPagination.links.next)}
     onPrevious={() => fetchPosts(postPagination.links.prev)}
  />
}

</> 
  )

}
export default Home
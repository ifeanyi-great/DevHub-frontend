import { useState, useEffect, useRef} from "react"
import { useParams } from "react-router"

function PostDetails(){

    const [post, setPost] = useState(null)
    const [postIsLoading, setPostIsLoading] = useState(true)
    const [postError, setPostError] = useState (null)

    const {id} = useParams()

    const abortControllerRef = useRef(null)

    useEffect(()=>{

      setPostIsLoading(true)
      setPostError(null)
      setPost(null)

      const controller = new AbortController() //this creates a controller for the current request
      abortControllerRef.current = controller  //this stores it in the useRef so it can be used later 
      

      fetch(`http://devhub.test/api/posts/${id}` ,{
          signal: controller.signal,
          headers:{
            Accept: 'application/json'
          }

      })
      .then(response => {
        
        if(!response.ok){
          throw new Error('Failed to fetch')
        }

        return response.json()
      })

      .then(data => {
        if(abortControllerRef.current !== controller || controller.signal.aborted){
          return
        }
        setPost(data.data)
      })

      .catch(error => {
        if (error.name === 'AbortError' || abortControllerRef.current !== controller){
              return
        }  

        console.error(error)
        setPostError('Failed to load post.')
      })

      .finally(()=>{
        if(abortControllerRef.current === controller){
          setPostIsLoading(false)
        }
      })
         
      return () => {
        controller.abort()
      }

    },[id])
    
    if(postIsLoading){
      return <p className="flex items-center justify-center h-screen dark:text-white">Loading post...</p>
    }
    
    if(postError){
      return <p className="flex items-center justify-center h-screen text-sm text-red-600">{postError}</p>
     }

     if(!post){
      return <p className="flex items-center justify-center h-screen dark:text-white">Post not found</p>
     }

    const difficultyLevel = {
      'beginner' : 'bg-green-100 text-green-700',
      'intermediate' : 'bg-yellow-100 text-yellow-700',
      'advanced' : 'bg-red-100 text-red-700'
    }

    return(
      <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="w-full border border-gray-100 dark:border-gray-700 shadow-sm bg-white dark:bg-slate-900 rounded-xl p-6 md-p-8">

        <header className="flex items-center gap-3 mb-5">
          {
            post.user?.profile_picture
          ? (
              <img 
                  src={`http://devhub.test/storage/${post.user?.profile_picture}`} 
                  alt={`${post.user?.name ?? 'user'}'s profile`} 
                  className="w-10 h-10 rounded-full object-cover"
              />
            )
          : (
              <span className=" flex items-center justify-center w-10 h-10  bg-violet-600 rounded-full text-white ">
                {post.user?.name?.charAt(0) ?? '?'}
              </span>
          )
          }
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">{post.user?.name}</h2>
        </header>
        
        <div className="flex items-center gap-3 mb-4">

            <span className={`inline-block text-sm px-3 py-1 font-semibold rounded-full ${difficultyLevel[post.difficulty?.toLowerCase()] ?? 'bg-gray-100 text-gray-600'}`}>
              {post.difficulty}
            </span>
          
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100">
              {post.title}
            </h1>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {post.description}
        </p>

        {
         post.code_snippet
          &&
         <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
           <code>{post.code_snippet}</code>
          </pre>
         
        }
      </article>
    </div>
    )
}

export default PostDetails
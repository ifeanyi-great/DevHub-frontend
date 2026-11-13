function PostCard ({id, title,description,codeSnippet,difficulty,user,userProfile}){
  console.log(id)
       const difficultyStyles = {
           'beginner': 'bg-green-100 text-green-700',
           'intermediate': 'bg-yellow-100 text-yellow-700',
           'advanced': 'bg-red-100 text-red-700'
       }

    return (
        <>
    <article className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-200 rounded-lg p-4 mb-4">

    <div className="flex items-center gap-3">
      { 
      userProfile 
       ? <img src={userProfile} alt="" className="w-10 h-10 rounded-full object-cover"/> 
       : <span className="flex items-center justify-center w-10 h-10 bg-violet-300  rounded-full font-bold">{(user || 'unknown user').charAt(0)}</span>
       }
        
         <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">{user}</h2>
    </div>

<div className="flex items-center gap-3 mt-3 mb-2">

    <span 
        className={`inline-block rounded-full px-3 py-1 text-xs font-semi-bold 
                   ${difficultyStyles[difficulty?.toLowerCase()] ?? 'bg-gray-100 text-gray-600'}`}>
        {difficulty}
    </span>

    <h3 className="text-lg text-gray-900 dark:text-slate-100 font-bold ">{title}</h3> 
</div>

     <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{description}</p>

    { 
     codeSnippet
     &&
     <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto my-4 ">
        <code className="font-mono">
            {codeSnippet}
        </code>
     </pre>
   }
    </article>
    </>
    )
}

export default PostCard
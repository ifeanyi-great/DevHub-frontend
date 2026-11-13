function Pagination({nextUrl, prevUrl, onNext, onPrevious}) {
    return (
        <div className="flex items-center justify-center gap-4 my-8">

            <button disabled={!nextUrl} 
                    onClick={onNext}
                    className="px-5 py-2 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                Next
            </button>

            <button 
                disabled={!prevUrl} 
                onClick={onPrevious}
                className="px-5 py-2 rounded-md border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-gray-100 dark:hover:bg-slate-800 disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
                Previous 
            </button>

        </div>

    )
}
export default Pagination
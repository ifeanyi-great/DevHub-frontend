import {useAuth} from '../context/AuthContext'
import { useState } from 'react'
import {useTheme} from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

function Navbar(){
    const {user,isAuthenticated,isLoading} = useAuth()

    const {theme,setTheme} = useTheme()
    
    const baseUrl = 'http://devhub.test/storage'
    
    const profilePicture = user?.profile_picture
        ? `${baseUrl}/${user.profile_picture}`
        : null

       const [isMenuOpen, setIsMenuOpen] = useState(false)

      if(isLoading){
         return null
    }

    const toggleTheme = ()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark' )
    }

    return(
        <>
        <nav className="relative z-50 bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-700 mb-6">

          <div className='flex flex-wrap items-center justify-between max-w-7xl mx-auto px-6 py-4'>
           

            <div className='flex items-center gap-8'>
                <a href="/" className="text-2xl font-bold text-violet-600">
                    Devhub
                </a>

                <a href="/" className="hidden md:block text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                    Home
                </a>

                <a href="/browse" className="hidden md:block text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                    Browse
                </a>

                <a href="/roadmaps" className="hidden md:block text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                    Roadmaps
                </a>
            </div>

           <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-slate-700 dark:text-slate-300 text-2xl font-bold cursor-pointer transition-colors hover:text-violet-600 ml-auto"
                >
                    {isMenuOpen ? '✕' : '☰'}
            </button>
              

              <button 
                 onClick={toggleTheme}
                 className='text-xl hidden md:block ml-auto px-4 cursor-pointer hover:text-violet-900 transition-all duration-300'
                 aria-label='Toggle theme'
                >
                 {theme === 'dark' ? (
                    <span className='text-white hover:text-violet-200 transition-all duration-300'>
                     <FontAwesomeIcon icon={faSun}/>
                     </span>
                 ):(
                    <FontAwesomeIcon icon={faMoon}/>
                 )
                 }
              </button>

          {isAuthenticated ?(
                <div className='hidden md:flex items-center gap-8'>

                    <a 
                       href="/profile"
                       className='hidden md:flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-violet-600 transition-colors'> 
                    {
                        profilePicture ? (
                            <img 
                               src={profilePicture}
                               alt="Profile"
                               className="w-9 h-9 rounded-full object-cover"
                            />
                        ):(
                            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {user?.name}
                    </span>
                  </a>  


                    <a href="/logout" className="hidden md:block text-red-600  hover:text-red-700 font-medium transition-colors">
                        Logout
                    </a>
                </div>
          ) : (
                <div className='flex items-center gap-8'>
                    <a href="/login" className="hidden md:block text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                        Login
                    </a>

                
                    <a href="/register" className="hidden md:block bg-violet-600 text-white px-5 py-2 rounded-md hover:bg-violet-700 font-medium transition-colors">
                        Register
                    </a>
                </div>
          )
          } 
          
          {isMenuOpen && (
            <div className="w-full md:hidden flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                
                <a href="/" className='text-slate-700 dark:text-slate-300 hover:text-violet-600'
                onClick={() => setIsMenuOpen(false)}
                >
                   Home
                </a>

                <a href="/browse" className='text-slate-700 dark:text-slate-300 hover:text-violet-600'
                onClick={() => setIsMenuOpen(false)}
                >
                   Browse
                </a>

                <a href="/roadmaps" className='text-slate-700 dark:text-slate-300 hover:text-violet-600'
                onClick={() => setIsMenuOpen(false)}
                >
                   Roadmaps
                </a>
                   
                <button 
                 onClick={toggleTheme}
                 className='text-xl mr-auto cursor-pointer hover:text-violet-900 transition-all duration-300'
                 aria-label='Toggle theme'
              >
                 {theme === 'dark' ? (
                    <span className='text-white hover:text-violet-200'>
                     <FontAwesomeIcon icon={faSun}/>
                     </span>
                 ):(
                    <FontAwesomeIcon icon={faMoon}/>
                 )
                 }
              </button>

                  {isAuthenticated ?(
                    <>
                      <a 
                       href="/profile"
                       className='flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-violet-600 transition-colors'> 
                    
                    {
                        profilePicture ? (
                            <img 
                               src={profilePicture}
                               alt="Profile"
                               className="w-9 h-9 rounded-full object-cover"
                            />
                        ):(
                            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {user?.name}
                    </span>
                  </a> 
                    
                   <a href="/logout" className="text-red-600  hover:text-red-700 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      >
                      Logout
                    </a>
                   </>

                  ):(
                    <>
                    <a href="/login" className="text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                    </a>

                    <a href="/register" className="bg-violet-600 text-white  py-2 rounded-md hover:bg-violet-700 font-medium transition-colors w-25 text-center"
                      onClick={() => setIsMenuOpen(false)}
                      >
                         Register
                    </a>
                  </>
                  )

                  }
            </div>
          )
            
          }
      </div>
        
      </nav>

      {isMenuOpen && (
        <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
        />
   )}
    </>    
    )
   
}

export default Navbar
import { createContext,useContext,useState,useEffect } from 'react'

export const ThemeContext = createContext()

const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme) {
            return savedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches 
             ? 'dark'
             : 'light'
    }

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(()=> {
        const root = document.documentElement

        root.classList.toggle('dark', theme === 'dark')

        localStorage.setItem('theme', theme)
    },[theme])

    


    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}

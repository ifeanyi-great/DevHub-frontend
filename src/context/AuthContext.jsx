import {createContext, useState, useEffect, useContext} from "react"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated = user !== null

    useEffect(() => {
        fetch('http://devhub.test/api/user', {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthenticated')
            }

            return response.json()
        })
        .then(data => {
            setUser(data)
        })
        .catch(() => {
            setUser(null)
        })
        .finally(() => {
            setIsLoading(false)
        })
        
    }, [])

        return (
            <AuthContext.Provider 
            value={{ user, setUser, isLoading, setIsLoading, isAuthenticated }}
            >
                    {children}
                </AuthContext.Provider>
            )
}  

export function useAuth() {
            return useContext(AuthContext)
        }

import { createContext, useContext, useState } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  alias: string | null
  password: string
}

interface Context {
  user: User | null
  changeUser: (user: User) => void
  logOut: () => void
}

// set state to localStorage if it exists, otherwise set to defaultValue
const setInitialState = () => {
  let storedState = undefined
  if (typeof window !== 'undefined') {
    // if we're in the browser
    storedState = localStorage.getItem('user')
  }
  if (storedState) {
    return JSON.parse(storedState)
  }
  return null
}

const defaultState = setInitialState()

const UserContext = createContext<Context | null>(defaultState)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(setInitialState)

  function changeUser(user: User) {
    try {
      if (typeof window !== 'undefined') {
        // if we're in the browser
        // set user to localStorage
        localStorage.setItem('user', JSON.stringify(user))
      }
      // set user to state
      setUser(user)
    } catch (err) {
      console.log(err)
    }
  }

  function logOut() {
    try {
      // remove user from localStorage
      if (typeof window !== 'undefined') {
        // if we're in the browser
        localStorage.removeItem('user')
      }
      // set user to defaultValue
      setUser(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UserContext.Provider value={{ user, changeUser, logOut }}>
      {children}
    </UserContext.Provider>
  )
}

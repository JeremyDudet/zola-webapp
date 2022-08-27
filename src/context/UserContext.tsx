import { createContext, useContext, useState } from 'react'
import { User } from '../types' // import User type

// define empty User object
const emptyUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  alias: '',
  password: ''
}

// set state to localStorage if it exists, otherwise set to emptyUser
const setInitialState = () => {
  let storedState = undefined
  if (typeof window !== 'undefined') {
    // if we're in the browser
    storedState = localStorage.getItem('user')
    console.log('storedState', storedState)
  }
  if (storedState) {
    return JSON.parse(storedState)
  }
  return emptyUser
}

// create context
const UserContext = createContext(setInitialState())

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(setInitialState())

  function changeUser(user: User) {
    try {
      if (typeof window !== 'undefined') {
        // if we're in the browser
        // set user to localStorage
        localStorage.setItem('user', JSON.stringify(user))
      }
      // set user to state
      console.log('user changed' + ' ' + user.firstName)
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
      console.log('logging out')
      setUser(emptyUser)
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

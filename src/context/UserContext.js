import { createContext, useContext, useState } from 'react'

const defaultValue = {
  firstName: '',
  lastName: '',
  alias: ''
}

// set state to localStorage if it exists, otherwise set to defaultValue
const setInitialState = () => {
  let storedState = undefined
  if (typeof window !== 'undefined') { // if we're in the browser
   storedState = localStorage.getItem('user')
  }
  if (storedState) {
    return JSON.parse(storedState)
  }
  return defaultValue
}

const UserContext = createContext(defaultValue)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {

  const [user, setUser] = useState(setInitialState)

  function changeUser(firstName, lastName, alias) {
    try {
      // set user to localStorage
      if (typeof window !== 'undefined') { // if we're in the browser
        localStorage.setItem('user', JSON.stringify({ firstName, lastName, alias }))
      }
      // set user to state
      setUser({ firstName, lastName, alias })
    }
    catch (err) {
      console.log(err)
    }
  }
   

  function logOut() {
    try {
      // remove user from localStorage
      if (typeof window !== 'undefined') { // if we're in the browser
        localStorage.removeItem('user')
      }
      // set user to defaultValue
      setUser(defaultValue)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <UserContext.Provider value={{ user, changeUser, logOut }}>
      {children}
    </UserContext.Provider>
  )
}
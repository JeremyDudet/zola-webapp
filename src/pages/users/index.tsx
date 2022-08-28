/* 
This page will be where admnistrators can manage users.
*/

import React from 'react'
import { useUserContext } from '../../context/UserContext' // import User state
// import { trpc } from '../../utils/trpc'
import Auth from '../../components/Auth'

function Index() {
  const { user } = useUserContext()

  if (!user.firstName) return <Auth />
  return <div>Users Page</div>
}

export default Index

import React from 'react'
import Auth from '../../components/Auth'
import { useAuthContext } from '../../context/AuthContext'

function Index() {
  const { user } = useAuthContext()
  if (!user.firstName) return <Auth />
  return <div>Tasks</div>
}

export default Index

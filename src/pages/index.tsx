/* 
  This is the homepage of the website.
  It is the first page that users see when they open the website.
  This will hold a few dashboard for 
*/

import { Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import { useAuthContext } from '../context/AuthContext' // import User state
import Auth from '../components/Auth'

// todo
// integrate login check

const Home: NextPage = () => {
  const { user } = useAuthContext()
  const userQuery = trpc.useQuery(['user.getUsers'])

  if (!user.first_name) return <Auth /> // if user is not logged in, return Auth component

  return (
    <>
      <Heading>{JSON.stringify(user.data)}</Heading>
      {userQuery.data && <Heading>{JSON.stringify(userQuery.data)}</Heading>}
    </>
  )
}

export default Home

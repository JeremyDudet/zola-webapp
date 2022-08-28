/* 
  This is the homepage of the website.
  It is the first page that users see when they open the website.
  This will hold a few dashboard for 
*/
import { Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { useUserContext } from '../context/UserContext' // import User state
import Auth from '../components/Auth'
import ClientOnly from '../components/ClientOnly'

// todo
// integrate login check

const Home: NextPage = () => {
  const { user } = useUserContext()
  const users = trpc.useQuery(['user.getAll'])

  if (!user.firstName) return <Auth /> // if user is not logged in, return Auth component

  return <Heading>{JSON.stringify(users.data)}</Heading>
}

export default Home

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

// todo
// integrate login check

const Home: NextPage = () => {
  const users = trpc.useQuery(['user.getAll'])
  const { user } = useUserContext()

  if (!user.firstName) return <Auth />

  return (
    <>
      <Head>
        <title>WebZola - Home</title>
        <meta name="description" content="WebZola" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>{JSON.stringify(users.data)}</Heading>
      </main>
    </>
  )
}

export default Home

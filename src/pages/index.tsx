import { Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

// todo
// [] fetch users from database

const Home: NextPage = () => {
  const users = trpc.useQuery(['user.getAll'])

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

// src/server/router/index.ts

// this is the root route
// here we also merge all the other routes

import { createRouter } from './context'
import superjson from 'superjson'
import { usersRouter } from './users'


export const appRouter = createRouter() // centralized point for all of our resolvers
  .transformer(superjson)
  .merge("user.", usersRouter) // merge the user router into the app router

// export type definition of API
export type AppRouter = typeof appRouter

// src/server/router/index.ts

// this is where the magic happens for tRCP

import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";

export const appRouter = createRouter() // centralized point for all of our resolvers
  .transformer(superjson)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

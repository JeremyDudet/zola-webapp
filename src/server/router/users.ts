import { createRouter } from './context'
import { z } from 'zod'
import { prisma } from '../db/client'
import { Prisma } from '@prisma/client'

// export const userRouter = createRouter()
//   .query('getAll', {
//     async resolve({ ctx }) {
//       return await ctx.prisma.users.findMany()
//     }
//   })

// just like GraphQl, tRPC uses queries and mutations.
// A query is used for fetching data and mutations are used to
// create, update, or delete data.

// Here we are creating a query to get a user by their id.

export const usersRouter = createRouter()
  .query("getUsers", {
    input: z.object({
      id: z.string().nullish(),
    }).nullish(),
    async resolve() {
      return await prisma.user.findMany();
    }
  })
  .mutation("deleteUser", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const deletedUser = await ctx.prisma.user.delete({
          where: {
            id: input?.id,
          },
        })
        console.log(deletedUser)
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          throw new Error("No user found with that id")
        } {
          
        }
      }
      return true
    }
  })


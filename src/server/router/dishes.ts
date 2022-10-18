import { createRouter } from './context'
import { z } from 'zod'

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


export const dishesRouter = createRouter()
  .query("getDishes", {
    async resolve({ ctx }) {
      return await ctx.prisma.dish.findMany({
        include: {
          components: {
            include: {
              allergens: true
            }
          },
          menuSection: true,
          menu: true,
        },
      });
    }
  })
  .mutation("deleteDish", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.dish.delete({
        where: {
          id: input.id,
        },
      }
    )
  }
  })
  // .mutation("createDish", {
  //   // validate input with Zod
  //   input: z.object({ 
  //     name: z.string(), 
  //     description: z.string(), 
  //     price: z.number(), 
  //     components: z.array(z.object({
  //       id: z.string(),
  //       name: z.string(),
  //       description: z.string(),
  //       removable: z.boolean(),
  //       allergyInfo: z.array(z.string()),
  //     })).optional(),
  //   }),
  //   async resolve({ ctx, input }) {
  //     await ctx.prisma.dish.create({
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         price: input.price,
  //         // components: input.components,          
  //       },
  //     })    
  //   }
  // })
  // .mutation("updateDish", {
  //   input: z.object({id: z.string(), name: z.string(), description: z.string(), price: z.number()  }),
  //   async resolve({ ctx, input }) {
  //     // update a user in the database based on the id
  //     const user = await ctx.prisma.dish.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         price: input.price,
  //         components: input.components,
  //       },
  //     })
  //     return user
  //   }
  // })


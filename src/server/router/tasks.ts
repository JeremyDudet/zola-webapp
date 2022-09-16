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

// model Task {
//     id             String   @id @default(cuid())
//     name          String
//     description    String
//     createdAt     DateTime @default(now())
//     lastEdited DateTime @updatedAt
//     priority       TaskPriority @relation(fields: [taskPriorityId], references: [id])
//     taskPriorityId String // this is the foreign key
//     assignedTo    Role @relation(fields: [roleId], references: [id]) // a task can only be assigned to one role
//     roleId         String // this is the foreign key
//     status         TaskStatus  // a task can only have one status
//   }
  

export const tasksRouter = createRouter()
  .query("getTasks", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany();
    }
  })

  .mutation("deleteTask", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      }
    )
  }
  })

  .mutation("createTask", {
    // validate input with Zod
    input: z.object({ 
      name: z.string(), 
      description: z.string(), 
      taskPriorityId: z.string(),
      roleId: z.string(),
      status: z.string()
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.task.create({
        data: {
            name: input.name,
            description: input.description,
            taskPriorityId: input.taskPriorityId,
            roleId: input.roleId,
            status: input.status
        },
      })  
    }
  })

  .mutation("updateTask", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      taskPriorityId: z.string(),
      roleId: z.string(),
      status: z.string()
    }),
    async resolve({ ctx, input }) {
      // update a user in the database based on the id
      const task = await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          taskPriorityId: input.taskPriorityId,
          roleId: input.roleId,
          status: input.status
        },
      })
      return task
    }
  })


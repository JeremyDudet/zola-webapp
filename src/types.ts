export interface User {
  id: string
  firstName: string
  lastName: string
  alias: string
  password: string
  auth: string
}

export interface NewUser {
  firstName: string
  lastName: string
  alias: string
  password: string
  auth: string
}

export interface Task {
  id: string
  name: string
  description: string
  taskPriorityId: string
  roleId: string
  status: string
}

export interface NewTask {
  name: string
  description: string
  taskPriorityId: string
  roleId: string
  status: string
}

export interface Day {
  id: string
  startingCovers: number
  endingCovers: number
  date: Date
  totalSales: number
  peopleStaffed: User[]
  tasksCompleted: Task[]
}

export interface Priority {
  id: string
  name: string
  description: string
}

export interface Role {
  id: string
  name: string
  description: string
  department: Department
}

export interface NewRole {
  name: string
  description: string
  department: Department
}

export interface Department {
  id: string
  name: string
  description: string
}

export interface NewDepartment {
  name: string
  description: string
}

export interface JuiceRequest {
  id: string
  requestFromId: string
  lemonAmount: number
  orangeAmount: number
  grapefruitAmount: number
  notes: string | null
  createdAt: Date
  lastEdited: Date
}

export interface NewJuiceRequest {
  requestFromId: string
  lemonAmount: number
  orangeAmount: number
  grapefruitAmount: number
  notes: string | null
}

export interface JuiceRequestUpdate {
  id: string
  lemonAmount: number
  orangeAmount: number
  grapefruitAmount: number
  notes: string | null
}

// model JuiceRequest {
//   id                String   @id @default(cuid())
//   requestFrom       User     @relation(name: "UserOnRequest", fields: [requestFromId], references: [id])
//   requestFromId     String
//   lemonAmount       Float
//   orangeAmount      Float
//   grapefruitAmount  Float
//   notes             String?
//   createdAt         DateTime @default(now())
//   lastEdited        DateTime @updatedAt
// }

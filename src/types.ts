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
  title: string
  description: string
}

export interface Day {
  id: string
  starting_covers: number
  ending_covers: number
  date: Date
  total_sales: number
  people_staffed: User[]
  tasks_completed: Task[]
}

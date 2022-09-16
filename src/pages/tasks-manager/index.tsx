/* 
  This is the page where admin can manage tasks
  We can also create, edit and delete task priority times.
  Here we can create, edit, delete tasks.
  You can filter tasks by priority, role, and domain.
*/

import React, { useState, useEffect, useCallback } from 'react'
import {
  Heading,
  Stack,
  Button,
  FormLabel,
  Flex,
  Select,
  useDisclosure,
  FormControl
} from '@chakra-ui/react'
import { trpc } from '../../utils/trpc'
import NewTaskModal from '../../components/NewTaskModal'
import SearchBar from '../../components/SearchBar'
import Auth from '../../components/Auth'
import TaskCard from '../../components/TaskCard'
import { useAuthContext } from '../../context/AuthContext'
import type { Task, NewTask } from '../../types'

function Index() {
  const { user } = useAuthContext()
  const utils = trpc.useContext()
  const createTask = trpc.useMutation('task.createTask')
  const getTasks = trpc.useQuery(['task.getTasks'])
  const updateTask = trpc.useMutation('task.updateTask')
  const deleteTask = trpc.useMutation('task.deleteTask')
  const [tasks, setTasks] = useState<Task[] | undefined>()

  const [search, setSearch] = React.useState('')
  const {
    isOpen: isNewRoleOpen,
    onOpen: onNewRoleOpen,
    onClose: onNewRoleClose
  } = useDisclosure()

  useEffect(() => {
    if (getTasks.isFetching) setTasks(undefined)
    if (getTasks.isFetched) setTasks(getTasks.data)
  }, [getTasks.data, getTasks.isFetched, getTasks.isFetching])

  const handleTaskDelete = useCallback(
    async (uid: string) => {
      await deleteTask.mutateAsync(
        { id: uid },
        {
          onSuccess: () => {
            utils.invalidateQueries(['task.getTasks'])
          }
        }
      )
    },
    [deleteTask, utils]
  )

  const handleTaskUpdate = useCallback(
    async (data: Task) => {
      await updateTask.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(['task.getTasks'])
        }
      })
    },
    [updateTask, utils]
  )

  const handleCreateTask = useCallback(
    async (data: NewTask) => {
      await createTask.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(['task.getTasks'])
        }
      })
    },
    [createTask, utils]
  )

  if (!user.firstName) return <Auth /> // if user is not logged in, return Auth component

  return (
    <>
      <NewTaskModal
        handleCreateTask={handleCreateTask}
        isOpen={isNewRoleOpen}
        onClose={onNewRoleClose}
      />
      <Stack gap={3}>
        <Flex justify="space-between">
          <Heading justifySelf={'flex-start'} pb="2">
            {"Tasks' Admin"}
          </Heading>
          <Button colorScheme="green" onClick={onNewRoleOpen}>
            New Task
          </Button>
        </Flex>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search tasks by name or description"
        />
        <FormControl>
          <FormLabel as="legend">Filter by role:</FormLabel>
          <Select>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </Select>
        </FormControl>
        {/* <HStack>
        <Heading size="md" as="h4">
          Adjust:
        </Heading>
        <Button size="sm" mr={4} onClick={onNewRoleOpen}>
          Roles
        </Button>
        <Button size="sm">Timings</Button>
      </HStack> */}
        {tasks &&
          // liveSearch()?.map(user => (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              setTasks={setTasks}
              name={task.name}
              description={task.description}
              taskPriorityId={task.taskPriorityId}
              roleId={task.roleId}
            />
          ))}
      </Stack>
    </>
  )
}

export default Index

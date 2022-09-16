/*
  [x] If the user clicks on Edit, a modal will pop up with a form to edit the user.
    If the user clicks Save, the user will be updated in the database,
    and the page will refresh.

  []  Update User
*/

import React, { useRef } from 'react'
import { Stack, useDisclosure, Text } from '@chakra-ui/react'
import { Task } from '../types'
import AlertDeleteModal from './AlertDeleteModal'

interface Props {
  handleTaskDelete: (id: string) => void
  handleTaskUpdate: (data: Task) => void
  setTasks: React.Dispatch<React.SetStateAction<Task[] | undefined>>
  id: string
  name: string
  description: string
  taskPriorityId: string
  roleId: string
}

function TaskCard({
  handleTaskDelete,
  handleTaskUpdate,
  setTasks,
  id,
  name,
  description,
  taskPriorityId,
  roleId
}: Props) {
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDeleteModal
        handleDelete={handleTaskDelete}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        cancelRef={cancelRef}
        id={id}
        actionDescriptor="Delete Task"
      />

      <Stack w="full">
        <Text>{name}</Text>
      </Stack>
    </>
  )
}

export default TaskCard

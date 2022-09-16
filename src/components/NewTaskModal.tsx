/*
    This is a modal that pops up when the user clicks on New Role.
    This modal will contain a form to add a user.
*/

import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import type { NewTask } from '../types'

interface Props {
  handleCreateTask: (data: NewTask) => void
  isOpen: boolean
  onClose: () => void
}

function NewTaskModal({ handleCreateTask, isOpen, onClose }: Props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [taskPriorityId, setTaskPriorityId] = React.useState('')
  const [roleId, setRoleId] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [statusId, setStatusId] = React.useState('')
  const [dueDate, setDueDate] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [estimatedTime, setEstimatedTime] = React.useState('')
  const [actualTime, setActualTime] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [isComplete, setIsComplete] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: NewTask = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      taskPriorityId: formData.get('taskPriorityId') as string
    }
    handleCreateTask(data)
    onClose()
  }

  return (
    <>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Roles</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Roles</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewTaskModal

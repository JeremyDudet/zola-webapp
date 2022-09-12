import { useRouter } from 'next/router'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { MutableRefObject } from 'react'
import { trpc } from '../utils/trpc'
import { User } from '../types'

interface Props {
  handleUserDelete: (uid: string) => void
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
  uid: string
  isOpen: boolean
  onClose: () => void
  cancelRef: MutableRefObject<null>
}

export default function AlertDeleteUser({
  handleUserDelete,
  uid,
  isOpen,
  onClose,
  cancelRef
}: Props) {
  const onDelete = () => {
    handleUserDelete(uid)
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete User
          </AlertDialogHeader>

          <AlertDialogBody>
            {"Are you sure? You can't undo this action afterwards."}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

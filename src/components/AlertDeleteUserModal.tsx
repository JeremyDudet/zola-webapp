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
import { MutableRefObject, useEffect } from 'react'
import { trpc } from '../utils/trpc'
import { User } from '../types'

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
  uid: string
  isOpen: boolean
  onClose: () => void
  cancelRef: MutableRefObject<null>
}

export default function AlertDeleteUser({
  setUsers,
  uid,
  isOpen,
  onClose,
  cancelRef
}: Props) {
  const deleteUserMutation = trpc.useMutation('user.deleteUser')
  const userQuery = trpc.useQuery(['user.getUsers'])
  const router = useRouter()

  const handleDelete = async () => {
    setUsers(userQuery.data)
    deleteUserMutation.mutate({ id: uid })
    router.reload()
  }

  useEffect(() => {
    if (deleteUserMutation.isSuccess) {
      setUsers(userQuery.data)
    }
  }, [deleteUserMutation.isSuccess, userQuery.data, setUsers])

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            {"Are you sure? You can't undo this action afterwards."}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

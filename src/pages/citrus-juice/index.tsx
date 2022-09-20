import { useState, useEffect, useCallback } from 'react'
import { trpc } from '../../utils/trpc'
import {
  HStack,
  Button,
  Heading,
  useDisclosure
} from '@chakra-ui/react'
import { BiMessageRoundedAdd } from 'react-icons/bi'
import { useAuthContext } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm'
import NewJuiceRequestModal from '../../components/NewJuiceRequestModal'
import JuiceRequestCard from '../../components/JuiceRequestCard'
import type { JuiceRequest, NewJuiceRequest, User } from '../../types'

export default function Index() {
  const utils = trpc.useContext()
  const getUsers = trpc.useQuery(['users.getUsers'])
  const getJuiceRequests = trpc.useQuery(['juiceRequests.getJuiceRequests'])
  const deleteJuiceRequest = trpc.useMutation('juiceRequests.deleteJuiceRequest')
  const createNewJuiceRequest = trpc.useMutation('juiceRequests.createJuiceRequest')
  const [juiceRequests, setJuiceRequests] = useState<JuiceRequest[] | undefined>()
  const [users, setUsers] = useState<User[] | undefined>()
  const { user } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // this updates the UI when the userQuery data is first loaded.
  useEffect(() => {
    if (getJuiceRequests.isFetching) setJuiceRequests(undefined)
    if (getJuiceRequests.isFetched) setJuiceRequests(getJuiceRequests.data)
  }, [
    getJuiceRequests.data,
    getJuiceRequests.isFetched,
    getJuiceRequests.isFetching
  ])

  useEffect(() => {
    if (getUsers.isFetching) setUsers(undefined)
    if (getUsers.isFetched) setUsers(getUsers.data)
  }, [
    getUsers.data,
    getUsers.isFetched,
    getUsers.isFetching
  ])
  const handleClose = () => {
    onClose()
  }

  const handleCreateJuiceRequest = useCallback(
    async (data: NewJuiceRequest) => {
      await createNewJuiceRequest.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(['juiceRequests.getJuiceRequests'])
        }
      })
    },
    [createNewJuiceRequest, utils]
  ) 

  const handleDeleteJuiceRequest = useCallback(
    async (id: string) => {
      await deleteJuiceRequest.mutateAsync(
        { id },
        {
          onSuccess: () => {
            utils.invalidateQueries(['juiceRequests.getJuiceRequests'])
          }
        }
      )
    },
    [deleteJuiceRequest, utils]
  )


  if (!user.firstName) {
    return <LoginForm />
  }

  return (
    <>
      <NewJuiceRequestModal isOpen={isOpen} onClose={handleClose} onSubmit={handleCreateJuiceRequest} />
      <HStack justify="space-between">
        <Heading>Citrus Juice</Heading>
        <Button leftIcon={<BiMessageRoundedAdd />} variant="outline" colorScheme="green" onClick={onOpen}>
          New Request
        </Button>
      </HStack>
      <Heading size="md">Requests</Heading>
      {juiceRequests?.map(juiceRequest => (
        <JuiceRequestCard
          users={users}
          id={juiceRequest.id}
          key={juiceRequest.id}
          requestedBy={juiceRequest.requestFromId}
          lemonAmount={juiceRequest.lemonAmount}
          orangeAmount={juiceRequest.orangeAmount}
          grapefruitAmount={juiceRequest.grapefruitAmount}
          notes={juiceRequest.notes}
          createdAt={juiceRequest.createdAt}
          lastEdited={juiceRequest.lastEdited}
          onDelete={handleDeleteJuiceRequest}
        />
      ))}
    </>
  )
}

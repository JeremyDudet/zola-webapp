import { useState, useEffect } from 'react'
import { trpc } from '../../utils/trpc'
import {
  HStack,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'
import { useAuthContext } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm'
import NewJuiceRequestForm from '../../components/NewJuiceRequestForm'
import JuiceRequestCard from '../../components/JuiceRequestCard'
import type { JuiceRequest } from '../../types'

export default function Index() {
  const getJuiceRequests = trpc.useQuery(['juiceRequests.getJuiceRequests'])
  const [juiceRequests, setJuiceRequests] = useState<JuiceRequest[] | undefined>()
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

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  if (!user.firstName) {
    return <LoginForm />
  }

  return (
    <>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewJuiceRequestForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justify="space-between">
        <Heading>Citrus Juice</Heading>
        <Button colorScheme="green" onClick={onOpen}>
          New Request
        </Button>
      </HStack>
      <Heading size="md">Requests</Heading>
      {juiceRequests?.map(juiceRequest => (
        <JuiceRequestCard
          key={juiceRequest.id}
          id={juiceRequest.id}
          lemonAmount={juiceRequest.lemonAmount}
          orangeAmount={juiceRequest.orangeAmount}
          grapefruitAmount={juiceRequest.grapefruitAmount}
          notes={juiceRequest.notes}
          createdAt={juiceRequest.createdAt}
          lastEdited={juiceRequest.lastEdited}
        />
      ))}
    </>
  )
}

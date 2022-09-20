import { useState, useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm'
import {
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Box,
  Divider
} from '@chakra-ui/react'
import ViewOnlyJuiceRequestCard from '../../components/JuiceRequestCardViewOnly'
import { trpc } from '../../utils/trpc'
import type { JuiceRequest, User } from '../../types'

export default function CitrusJuicePars() {
  const { user } = useAuthContext()
  const getJuiceRequests = trpc.useQuery(['juiceRequests.getJuiceRequests'])
  const getUsers = trpc.useQuery(['users.getUsers'])
  const [juiceRequests, setJuiceRequests] = useState<
    JuiceRequest[] | undefined
  >()
  const [users, setUsers] = useState<User[] | undefined>()

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
  }, [getUsers.data, getUsers.isFetched, getUsers.isFetching])

  const filterYesterdaysRequests = (requests: JuiceRequest[] | undefined) => {
    if (!requests) return []
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return requests.filter(request => {
      const requestDate = new Date(request.createdAt)
      return (
        requestDate.getDate() === yesterday.getDate() &&
        requestDate.getMonth() === yesterday.getMonth() &&
        requestDate.getFullYear() === yesterday.getFullYear()
      )
    })
  }

  if (!user.firstName) {
    return <LoginForm />
  }

  return (
    <>
      <Heading mb={8}>Daily Citrus</Heading>
      <Heading size="md" mb={4}>
        Default Pars
      </Heading>
      <TableContainer pb="1.5rem">
        <Table size="sm" variant="simple">
          <TableCaption>
            **if covers are more than or less than average adjust juice more or
            less acordingly
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Pars (avg covers)</Th>
              <Th>Tue (80-110)</Th>
              <Th>Wed/Thu (90 -125)</Th>
              <Th>Fri/Sat (110 -160)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg={useColorModeValue('green.200', 'green.900')}>
              <Td>Lime</Td>
              <Td>2 (L)</Td>
              <Td>2.75 (L)</Td>
              <Td>3 (L)</Td>
            </Tr>
            <Tr bg={useColorModeValue('yellow.200', 'yellow.900')}>
              <Td>Lemon</Td>
              <Td>1.5 (L)</Td>
              <Td>2 (L)</Td>
              <Td>2.25 (L)</Td>
            </Tr>
            <Tr bg={useColorModeValue('orange.200', 'orange.900')}>
              <Td>OJ ** </Td>
              <Td>1.5 (L)</Td>
              <Td>1.5 (L)</Td>
              <Td>1.5 (L)</Td>
            </Tr>
            <Tr bg={useColorModeValue('red.200', 'red.900')}>
              <Td>GF **</Td>
              <Td>1.5 (L)</Td>
              <Td>1.5 (L)</Td>
              <Td>1.5 (L)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Box mt={6}>
        <Heading size="md">{"Last Night's Kitchen Requests"}</Heading>
        {filterYesterdaysRequests(juiceRequests)?.map(juiceRequest => (
          <ViewOnlyJuiceRequestCard
            users={users}
            id={juiceRequest.id}
            key={juiceRequest.id}
            requestedBy={juiceRequest.requestFromId}
            lemonAmount={juiceRequest.lemonAmount}
            orangeAmount={juiceRequest.orangeAmount}
            grapefruitAmount={juiceRequest.grapefruitAmount}
            notes={juiceRequest.notes}
            createdAt={juiceRequest.createdAt}
          />
        ))}
      </Box>
    </>
  )
}

/*
  This page is the main page for the users manager.
  Here authorized users can add, edit, and delete users.

  [] Users will be sorted by their last name. 

  [] We can also search users by their first name, last name, alias or authorization level.
  The search bar is case insensitive. And the filter is applied to all three fields.
  The search bar is also debounced, so it won't search until the user stops typing.
  The search bar is also smart, so it will search for the first word in the search bar,
  and then the second word, and so on.

  For example, if the search bar is "John Doe", it will search for all users that have
  "John" in their first name, last name, or alias, and then it will search for all users
  that have "Doe" in their first name, last name, or alias.

  [] What the user typed in the search bar will also be saved to localStorage, 
  so it will persist through page refreshes.

  [x] This page grabs users from the database and displays a card for each user.
  The cards display the user's image, first name, last name, alias, 
  and buttons to edit or delete the user.

  [x] If the user clicks on Delete, a modal will pop up asking them to confirm.
    If confirmed, the user will be deleted from the database, 
    and the page will refresh.

  [] If the user clicks on Edit, a modal will pop up with a form to edit the user.
    If the user clicks Save, the user will be updated in the database,
    and the page will refresh.

  [x] If the user clicks on Add User, a modal will pop up with a form to add a user.
    If the user clicks Save, the user will be added to the database,
    and the page will refresh.

*/

import { useState, useEffect, useCallback } from 'react'
import { trpc } from '../../utils/trpc'
import {
  Heading,
  HStack,
  Stack,
  Flex,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@chakra-ui/react'
import SearchBar from '../../components/SearchBar'
import UserCard from '../../components/UserCard'
import NewUserModal from '../../components/NewUserModal'
import type { User, NewUser } from '../../types'

export default function Index() {
  const utils = trpc.useContext()
  const createUser = trpc.useMutation('user.createUser')
  const getUsers = trpc.useQuery(['user.getUsers'])
  const updateUser = trpc.useMutation('user.updateUser')
  const deleteUser = trpc.useMutation('user.deleteUser')
  const [authFilter, setAuthFilter] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [users, setUsers] = useState<User[] | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // this updates the UI when the userQuery data is first loaded.
  useEffect(() => {
    if (getUsers.isFetching) setUsers(undefined)
    if (getUsers.isFetched) setUsers(getUsers.data)
  }, [getUsers.data, getUsers.isFetched, getUsers.isFetching])

  const handleUserDelete = useCallback(
    async (uid: string) => {
      await deleteUser.mutateAsync(
        { id: uid },
        {
          onSuccess: () => {
            utils.invalidateQueries(['user.getUsers'])
          }
        }
      )
    },
    [deleteUser, utils]
  )

  const handleUserUpdate = useCallback(
    async (data: User) => {
      await updateUser.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(['user.getUsers'])
        }
      })
    },
    [updateUser, utils]
  )

  const handleCreateUser = useCallback(
    async (data: NewUser) => {
      await createUser.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(['user.getUsers'])
        }
      })
    },
    [createUser, utils]
  )

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setAuthFilter(e.target.value)
  }

  const filteredUsers = users?.filter(user => {
    if (authFilter === 'all') return true
    return user.auth === authFilter
  })

  const liveSearch = () => {
    return filteredUsers?.filter(user => {
      const firstName = user.firstName.toLowerCase()
      const lastName = user.lastName.toLowerCase()
      const alias = user.alias.toLowerCase()
      const password = user.password.toLowerCase()
      const searchWords = search.toLowerCase().split(' ')
      return searchWords.every(word => {
        return (
          firstName.includes(word) ||
          lastName.includes(word) ||
          alias.includes(word) ||
          password.includes(word)
        )
      })
    })
  }

  return (
    <>
      <NewUserModal
        handleCreateUser={handleCreateUser}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Stack gap={3}>
        <Flex justify="space-between">
          <Heading>{"User's Admin"}</Heading>
          <Button colorScheme="green" onClick={onOpen}>
            New User
          </Button>
        </Flex>
        <SearchBar search={search} setSearch={setSearch} />
        <FormControl pb={8} rounded="lg">
          <FormLabel as="legend">Filter by Authorization Level:</FormLabel>
          <RadioGroup defaultValue="all">
            <HStack spacing="12px">
              <Radio
                value="all"
                checked={authFilter === 'all'}
                onChange={handleOptionChange}
              >
                All
              </Radio>
              <Radio
                value="user"
                checked={authFilter === 'user'}
                onChange={handleOptionChange}
              >
                User
              </Radio>
              <Radio
                value="bar"
                checked={authFilter === 'bar'}
                onChange={handleOptionChange}
              >
                Bar
              </Radio>
              <Radio
                value="kitchen"
                checked={authFilter === 'kitchen'}
                onChange={handleOptionChange}
              >
                Kitchen
              </Radio>
              <Radio
                value="admin"
                checked={authFilter === 'admin'}
                onChange={handleOptionChange}
              >
                Admin
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        {users &&
          liveSearch()?.map(user => (
            <UserCard
              key={user.id}
              handleUserDelete={handleUserDelete}
              handleUserUpdate={handleUserUpdate}
              setUsers={setUsers}
              uid={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              alias={user.alias}
              password={user.password}
              auth={user.auth}
            />
          ))}
      </Stack>
    </>
  )
}

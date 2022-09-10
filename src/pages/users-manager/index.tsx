/*
  This page is the main page for the users manager.
  Here authorized users can add, edit, and delete users.

  [] Users will be sorted by their last name. 

  [] We can also search users by their first name, last name, or alias.
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

  [] If the user clicks on Add User, a modal will pop up with a form to add a user.
    If the user clicks Save, the user will be added to the database,
    and the page will refresh.

*/

import { useState, useEffect } from 'react'
import { trpc } from '../../utils/trpc'
import { Heading, Stack, Flex, Button, useDisclosure } from '@chakra-ui/react'
import SearchBar from '../../components/SearchBar'
import UserCard from '../../components/UserCard'
import { User } from '../../types'
import AddUserModal from '../../components/AddUserModal'

export default function Index() {
  const userQuery = trpc.useQuery(['user.getUsers'])
  const [search, setSearch] = useState<string>('')
  const [users, setUsers] = useState<User[] | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // this updates the UI when the userQuery data is first loaded.
  useEffect(() => {
    if (userQuery.isFetching) setUsers(undefined)
    if (userQuery.isFetched) setUsers(userQuery.data)
  }, [userQuery.data, userQuery.isFetched, userQuery.isFetching])

  return (
    <>
      <AddUserModal isOpen={isOpen} onClose={onClose} />
      <Stack gap={3}>
        <Flex justify="space-between">
          <Heading>{"User's Admin"}</Heading>
          <Button colorScheme="green" onClick={onOpen}>
            Add User
          </Button>
        </Flex>
        <SearchBar search={search} setSearch={setSearch} />
        {users &&
          users.map(user => (
            <UserCard
              setUsers={setUsers}
              key={user.id}
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

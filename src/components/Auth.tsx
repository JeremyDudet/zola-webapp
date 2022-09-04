/* 
Summary: This is the main component for the authentication process.

This is the authentication component that users get redirected to when:
1. They first open the website, and they are not logged in.
    (aka, they don't have a localstorage token)
2. They click "Switch Users" in the navbar. (aka logout)

----------------------------------------
  
When this component mounts, it grabs users from the database.
The inputed password will be compared to the passwords in the database.
If the passwords match, the user will be logged in, and
and then the client-side will render the original page they were on.

*/

import { useState, useRef } from 'react'
import { trpc } from '../utils/trpc'
import { ArrowRightIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Text,
  Heading,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverCloseButton,
  PopoverBody,
  Image,
  HStack,
  PinInput,
  PinInputField,
  useToast
} from '@chakra-ui/react'
import { useUserContext } from '../context/UserContext'
import { User } from '../types' // import User type
// import PasswordInput from './PasswordInput'

// todo
// [x] import users data from database
// [x] check if password provided matches a user's password
// [] if it does, login new user through context

export default function Auth() {
  const toast = useToast() // for toast notifications
  const { onOpen, onClose, isOpen } = useDisclosure() // for popover
  const passwordInput = useRef<HTMLInputElement>(null) // password input ref
  const [password, setPassword] = useState<string>('') // password state
  const { changeUser } = useUserContext() // change user context

  // fetch array of user objects from database
  const userQuery = trpc.useQuery(['users.getUser'])

  // use this to check if password matches a user's password
  function handleSubmit(password: string) {
    let matched = false
    // loop through users array
    userQuery?.data?.forEach((user: User) => {
      if (password === user.password) {
        console.log('password matched')
        matched = true
        changeUser(user) // login user
      }
    })

    if (!matched) {
      // show error message
      console.log('Error: no such password')
      setPassword('') // clear password
      if (passwordInput.current) {
        passwordInput?.current?.focus() // focus on password input
      }
      return toast({
        // send error message toast
        position: 'top',
        title: 'Password not found.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <Flex paddingTop="1rem" direction="column" gap={10}>
      <Flex justify="center">
        <Heading>ENTER PASSWORD</Heading>
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="top-start"
          orientation="horizontal"
        >
          <PopoverTrigger>
            <IconButton
              aria-label="input password"
              position="relative"
              left="3px"
              top="5px"
              variant="ghost"
              size="sm"
              icon={<InfoOutlineIcon />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Hint</PopoverHeader>
            {/* <PopoverArrow/> */}
            <PopoverCloseButton />
            <PopoverBody>
              <Text alignItems="center">
                Use the same password you were given to access Toast
                <Image
                  display="inline"
                  position="relative"
                  top="3px"
                  borderRadius="full"
                  boxSize="15px"
                  src="toast_favicon.png"
                  alt="Toast Logo"
                />
              </Text>
            </PopoverBody>
            <PopoverFooter>
              <Text>{"If your password doesn't work, me know 🙏"}</Text>
              <Text float="right">- Jeremy</Text>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
      <HStack justify="center">
        <PinInput
          defaultValue=""
          type="number"
          size="lg"
          autoFocus={true}
          value={password}
          onChange={value => setPassword(value)}
        >
          <PinInputField ref={passwordInput} />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Flex justify="center">
        <Button
          as={Button}
          size="lg"
          rightIcon={<ArrowRightIcon />}
          width="10rem"
          onClick={() => handleSubmit(password)}
        >
          GO
        </Button>
      </Flex>
    </Flex>
  )
}

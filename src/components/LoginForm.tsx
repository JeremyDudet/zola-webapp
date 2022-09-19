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

import { useEffect, useState, useRef } from 'react'
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
  Input,
  useToast
} from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext'
// import { User } from '../types' // import User type
// import PasswordInput from './PasswordInput'

// todo
// [x] import users data from database
// [x] check if password provided matches a user's password
// [] if it does, login new user through context
// [] fix input delete bug

export default function LoginForm() {
  const toast = useToast() // for toast notifications
  const { onOpen, onClose, isOpen } = useDisclosure() // for popover
  const { changeUser } = useAuthContext() // change user context

  // setting display name for forwardRef() component
  // is good for debugging , since it means that it will print
  // your component's displayNme property in the React DevTools

  // fetch array of user objects from database
  const userQuery = trpc.useQuery(['users.getUsers'])

  // use this to check if password matches a user's password
  function handleSubmit(password: string) {
    let matched = false
    // loop through users array
    userQuery?.data?.forEach(user => {
      if (password === user.password) {
        console.log('password matched')
        matched = true
        changeUser(user) // login user
      }
    })

    if (!matched) {
      // show error message
      console.log('Error: no such password')
      if (firstPinInput.current) {
        firstPinInput?.current?.focus() // focus on password input
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

  const firstPinInput = useRef<HTMLInputElement>(null)
  const secondPinInput = useRef<HTMLInputElement>(null)
  const thirdPinInput = useRef<HTMLInputElement>(null)
  const fourthPinInput = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')

  // if backspace is pressed, delete previous input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      // remove the last character from the password
      console.log('backspace pressed')
      setPassword(password => password.slice(0, -1))
    }
  }

  // focus on first input when component mounts
  useEffect(() => {
    firstPinInput.current?.focus()
  }, [])

  // here we are controlling the focus of the input
  useEffect(() => {
    // if password length is 1, focus on second input
    if (password.length === 0) firstPinInput.current?.focus()
    if (password.length === 1) secondPinInput.current?.focus()
    if (password.length === 2) thirdPinInput.current?.focus()
    if (password.length === 3) fourthPinInput.current?.focus()
    console.log('Password: ' + password)
  }, [password])

  const handleSetPassword = (order: string, input: string) => {
    if (order === 'first') {
      setPassword(input)
    }
    if (order === 'second') {
      setPassword(password => password + input)
    }
    if (order === 'third') {
      setPassword(password => password + input)
    }
    if (order === 'fourth') {
      setPassword(password => password + input)
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
                  src="/toast_favicon.png"
                  alt="Toast Logo"
                />
              </Text>
            </PopoverBody>
            <PopoverFooter>
              <Text>{"If your password doesn't work, let me know. 🙏"}</Text>
              <Text float="right">- Jeremy</Text>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
      <HStack justifyContent="center">
        <Input
          maxW="45px"
          maxLength={1}
          size="lg"
          pattern={'/[0-9]/'}
          as="input"
          ref={firstPinInput}
          value={password[0]}
          onKeyDown={handleKeyDown}
          onChange={e => handleSetPassword('first', e.target.value)}
        />
        <Input
          maxW="45px"
          size="lg"
          maxLength={1}
          ref={secondPinInput}
          value={password[1]}
          onKeyDown={handleKeyDown}
          onChange={e => handleSetPassword('second', e.target.value)}
        />
        <Input
          maxW="45px"
          size="lg"
          maxLength={1}
          ref={thirdPinInput}
          value={password[2]}
          onKeyDown={handleKeyDown}
          onChange={e => handleSetPassword('third', e.target.value)}
        />
        <Input
          maxW="45px"
          size="lg"
          maxLength={1}
          ref={fourthPinInput}
          value={password[3]}
          onKeyDown={handleKeyDown}
          onChange={e => handleSetPassword('fourth', e.target.value)}
        />
      </HStack>
      <Flex justify="center">
        <Button
          as={Button}
          size="lg"
          rightIcon={<ArrowRightIcon />}
          width="6rem"
          onClick={() => handleSubmit(password)}
        >
          GO
        </Button>
      </Flex>
    </Flex>
  )
}

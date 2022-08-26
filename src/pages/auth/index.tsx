/* 
  This is the authentication page that users get redirected to when 
  they open this website.

  When this page opens, it initializes UserContext.
  When usercontext gets initialized, it checks if there is a user in localStorage.
  If there is a user in localStorage, it sets the user to state.
  If there is no user in localStorage, it sets the user to null.
     and redirects the user to this page. (src/pages/auth)
  
  When this component mounts, it grabs users from the database.
  The user inputs a password, 
     and if the passwords matches the password of one of the users in the database,
      it sets the user to state.
      and redirects the user to the original page they were trying to access.
*/
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
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
import { useUserContext } from '../../context/UserContext'
// import PasswordInput from './PasswordInput'

// todo
// [x] import users data from database
// [x] check if password provided matches a user's password
// [] if it does, login new user through context
// [] and redirect to previous page

export default function Auth() {
  const router = useRouter()
  const toast = useToast()
  const passwordInput = useRef<HTMLElement>(null)

  const { onOpen, onClose, isOpen } = useDisclosure()
  const [password, setPassword] = useState<string>('')
  const { changeUser } = useUserContext()

  // grab array of user objects from database
  const users = trpc.useQuery(['user.getAll'])?.data

  function handleClick(password: string) {
    let matched = false

    // loop through the users data
    for (let i = 0; i < users.length; i++) {
      if (password === users[i].password) {
        // if the inputed password matches a user's password
        console.log('Matched!')
        console.log(users[i])
        matched = true // set matched to true
        changeUser(users[i]) // change the user context
        // redirect to previous page
        // router.back()
      }
    }

    if (!matched) {
      // show error message
      console.log('Error: no such password')
      setPassword('') // clear password
      if (passwordInput.current) {
        passwordInput.current.focus() // focus on password input
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
          // flip={false}
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
          onClick={() => handleClick(password)}
        >
          GO
        </Button>
      </Flex>
    </Flex>
  )
}

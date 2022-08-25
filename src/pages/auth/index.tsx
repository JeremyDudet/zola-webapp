import React, { useState, useRef } from 'react'
import { ArrowRightIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import {
  useToast,
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
  PinInputField
} from '@chakra-ui/react'
// import PasswordInput from './PasswordInput'

export default function Auth() {
  const toast = useToast()
  const passwordInput = useRef(null)

  const { onOpen, onClose, isOpen } = useDisclosure()
  const [password, setPassword] = useState('')

  function handleClick() {
    let matched = false
    // loop through the userData and grab the info of the user that matches the password
    for (let i = 0; i < userData.length; i++) {
      if (userData[i][0] === password) {
        matched = true
        var [password, firstName, lastName, alias] = userData[i]
      }
    }

    console.log('Matched User: ' + password)

    if (matched === false) {
      setPassword(null) // clear password input
      const elementRef = passwordInput.current
      elementRef.focus() // refocus to the first input
      return toast({
        // send a error message
        position: 'top',
        title: "Password Doesn't Exist",
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      changeUser(firstName, lastName, alias)
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
              <Text>{"If your password doesn't work, me know 🤙"}</Text>
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

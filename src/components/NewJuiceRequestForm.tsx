import { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  useColorModeValue
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useAuthContext } from '../context/AuthContext'
import LoginForm from './LoginForm'

const StyledSpanStart = styled.div`
  color: gray;
  font-size: 1.1rem;
  font-style: italic;
`
const StyledSpanEnd = styled.div`
  color: gray;
  font-size: 1.1rem;
  font-style: italic;
`

export default function NewJuiceRequest() {
  const { user } = useAuthContext()
  const [lemonJuice, setLemonJuice] = useState(0)
  const [orangeJuice, setOrangeJuice] = useState(0)
  const [grapefuitJuice, setGrapefuitJuice] = useState(0)
  // const [notes, setNotes] = useState('')

  const HandleColorModeChange = (light: string, dark: string) => {
    return useColorModeValue(light, dark)
  }

  if (!user.firstName) {
    return <LoginForm />
  }
  return (
    <>
      <Box pb="1.5rem">
        <StyledSpanStart>Please, for tomorrow may I have...</StyledSpanStart>
      </Box>
      <FormControl>
        <HStack
          borderRadius="lg"
          alignItems="center"
          justify="space-between"
          pb="4"
        >
          <FormLabel
            color={HandleColorModeChange('yellow.500', 'yellow.300')}
            m="0"
            fontWeight="semibold"
            fontSize="1.15rem"
          >
            Lemon Juice:
          </FormLabel>
          <HStack>
            <NumberInput
              value={lemonJuice}
              maxW="6rem"
              step={0.25}
              max={3}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>quarts</FormLabel>
          </HStack>
        </HStack>
        <HStack alignItems="center" justify="space-between" pb="4">
          <FormLabel
            color={HandleColorModeChange('orange.500', 'orange.300')}
            m="0"
            fontWeight="semibold"
            fontSize="1.15rem"
            pr=""
          >
            Orange Juice:
          </FormLabel>
          <HStack>
            <NumberInput
              value={orangeJuice}
              maxW="6rem"
              step={0.25}
              max={3}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>quarts</FormLabel>
          </HStack>
        </HStack>
        <HStack alignItems="center" justify="space-between" pb="4">
          <FormLabel
            color={HandleColorModeChange('red.500', 'red.300')}
            m="0"
            fontWeight="semibold"
            fontSize="1.15rem"
            pr=""
          >
            Grapefruit Juice:
          </FormLabel>
          <HStack>
            <NumberInput
              value={grapefuitJuice}
              maxW="6rem"
              step={0.25}
              max={3}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>quarts</FormLabel>
          </HStack>
        </HStack>
        {/* <Text mb="8px">Notes: </Text>
        <Textarea
          placeholder="Anything else?"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        /> */}
        <VStack alignItems="flex-end" pr="2rem" py="1.2rem">
          <StyledSpanEnd>{`...thank you. `}</StyledSpanEnd>
          <StyledSpanEnd>{`- ${
            user.alias ? user.alias : user.firstName
          }`}</StyledSpanEnd>
        </VStack>
      </FormControl>
    </>
  )
}

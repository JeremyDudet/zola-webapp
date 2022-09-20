import { useRef } from 'react'
import {
  Box,
  Text,
  Flex,
  IconButton,
  VStack,
  useDisclosure,
  HStack
} from '@chakra-ui/react'
import AlertDeleteModal from './AlertDeleteModal'
import UpdateJuiceRequestModal from './UpdateJuiceRequestModal'
import styled from '@emotion/styled'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import type { User } from '../types'

const StyledSpan = styled.span`
  color: gray;
  font-size: 1.1rem;
  font-style: italic;
`

interface Props {
  id: string
  users: User[] | undefined
  requestedBy: string
  lemonAmount: number
  orangeAmount: number
  grapefruitAmount: number
  notes: string | null
  createdAt: Date
  lastEdited: Date
  onDelete: (id: string) => void
}

export default function JuiceRequestCard(props: Props) {
  const user = props.users?.find(user => user.id === props.requestedBy) // find the user that matches the requestedBy id
  const cancelRef = useRef(null)
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()

  const determineIfPlural = (amount: number) => {
    return amount > 1 ? 's' : ''
  }

  return (
    <>
      <AlertDeleteModal
        cancelRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        handleDelete={props.onDelete}
        id={props.id}
        actionDescriptor="Delete Request"
      />
      <UpdateJuiceRequestModal isOpen={isUpdateOpen} onClose={onUpdateClose} />
      <Flex p={38} w="full" alignItems="center" justifyContent="center">
        <Box
          w="md"
          mx="auto"
          py={4}
          px={8}
          bg="white"
          _dark={{
            bg: 'gray.800'
          }}
          shadow="lg"
          rounded="lg"
        >
          {props.lemonAmount === 0 &&
          props.orangeAmount === 0 &&
          props.grapefruitAmount === 0 ? (
            <>
              <StyledSpan>No juice needed!</StyledSpan>
              <VStack alignItems="flex-end" pr="2rem" py="1.2rem">
                <StyledSpan>{`...thank you. `}</StyledSpan>
                <StyledSpan>{`- ${
                  user?.alias ? user?.alias : user?.firstName
                }`}</StyledSpan>
              </VStack>
            </>
          ) : (
            <>
              <Box pb="1.5rem">
                <StyledSpan>Please, for tomorrow may I have:</StyledSpan>
              </Box>
              <VStack alignItems="center">
                <HStack justifyContent="flex-start">
                  {props.lemonAmount ? (
                    <Text>{`${props.lemonAmount} quart${determineIfPlural(
                      props.lemonAmount
                    )} of lemon juice${props.orangeAmount ? ',' : ''}`}</Text>
                  ) : null}
                </HStack>
                <Box>
                  {props.orangeAmount ? (
                    <Text>{`${props.orangeAmount} quart${determineIfPlural(
                      props.orangeAmount
                    )} of orange juice${
                      props.grapefruitAmount ? ',' : ''
                    }`}</Text>
                  ) : null}
                </Box>
                <Box>
                  {props.grapefruitAmount ? (
                    <Text>{`${props.grapefruitAmount} quart${determineIfPlural(
                      props.grapefruitAmount
                    )} of grapefruit juice`}</Text>
                  ) : null}
                </Box>
              </VStack>
              <VStack alignItems="flex-end" pr="2rem" py="1.2rem">
                <StyledSpan>{`...thank you. `}</StyledSpan>
                <StyledSpan>{`- ${
                  user?.alias ? user?.alias : user?.firstName
                }`}</StyledSpan>
              </VStack>
              {props.notes ? (
                <Box alignItems="flex-start">
                  <StyledSpan>{`PS: `}</StyledSpan>
                  <StyledSpan>{props.notes}</StyledSpan>
                </Box>
              ) : null}
            </>
          )}
          <Flex mt={4} justifyContent="flex-end" gap="1rem">
            <IconButton
              variant={'outline'}
              aria-label="update"
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={onUpdateOpen}
            >
              Update
            </IconButton>
            <IconButton
              variant={'outline'}
              aria-label="delete"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={onDeleteOpen}
            >
              Delete
            </IconButton>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

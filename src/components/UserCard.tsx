import React, { useRef } from 'react'
import {
  Flex,
  Box,
  Image,
  chakra,
  Heading,
  Center,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import AlertDeleteUser from './AlertDeleteUserModal'
import { User } from '../types'

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
  uid: string
  firstName: string
  lastName: string
  alias: string
  password: string
  auth: string
}

function UserCard({
  setUsers,
  uid,
  firstName,
  lastName,
  alias,
  password,
  auth
}: Props) {
  const image = ''
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDeleteUser
        setUsers={setUsers}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        uid={uid}
      />

      <Flex p={50} w="full" alignItems="center" justifyContent="center">
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
          <Flex
            justifyContent={{
              base: 'center',
              md: 'end'
            }}
            mt={-16}
          >
            {image ? (
              <Image
                w={20}
                h={20}
                fit="cover"
                rounded="full"
                borderStyle="solid"
                borderWidth={2}
                color="brand.500"
                _dark={{
                  color: 'brand.400'
                }}
                alt="Testimonial avatar"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              />
            ) : (
              <Center
                w={20}
                h={20}
                rounded="full"
                borderStyle="solid"
                borderWidth={2}
                color="brand.500"
                fontSize="2xl"
                bg="gray.100"
                _dark={{
                  bg: 'gray.700',
                  color: 'brand.400'
                }}
              >
                <Heading>{`${firstName.charAt(0)}${lastName.charAt(
                  0
                )}`}</Heading>
              </Center>
            )}
          </Flex>

          <Heading
            color="gray.800"
            _dark={{
              color: 'white'
            }}
            fontSize={{
              base: '2xl',
              md: '3xl'
            }}
            mt={{
              base: 2,
              md: 0
            }}
            fontWeight="bold"
          >
            {alias ? `${alias}` : `${firstName} ${lastName}`}
          </Heading>

          <Text
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.200'
            }}
          >
            <>{`First Name: ` + firstName}</>
          </Text>
          <Text
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.200'
            }}
          >
            <>{`Last Name: ` + lastName}</>
          </Text>
          <Text
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.200'
            }}
          >
            {alias ? <>{`Alias: ` + alias}</> : 'Alias: N/A'}
          </Text>
          <chakra.p
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.200'
            }}
          >
            {`Password: ${password}`}
          </chakra.p>
          <chakra.p
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.200'
            }}
          >
            {`Authorization: ${auth}`}
          </chakra.p>
          <Flex mt={4} justifyContent="space-between">
            <Button colorScheme="facebook">Update</Button>
            <Button colorScheme="red" onClick={onOpen}>
              Delete
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default UserCard

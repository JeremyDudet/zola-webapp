import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  VStack,
  ModalBody,
  Flex,
  Box,
  useColorModeValue,
  Stack,
  StackDivider,
  Text,
  Heading,
  Avatar,
  ModalCloseButton,
  SimpleGrid,
  List,
  ListItem
} from '@chakra-ui/react'
import type { Dish, Component, Allergen } from '../types'

interface Props {
  dish: Dish
  isOpen: boolean
  onClose: () => void
}

// export interface Dish {
//     id: string
//     name: string
//     description: string
//     advertisedDescription: string
//     price: number
//     components?: Component[]
//     menu?: Menu
//     menuSection?: MenuSection
//     allergens?: Allergen[]
//   }

export default function FoodNoteModal(props: Props) {
  const IMAGE =
    'https://res.cloudinary.com/zola-barzola/image/upload/v1665788285/IMG_8139_kod9jp.jpg'

  const components = props.dish.components
  const allergens = components?.map(component => component.allergens)
  const allergenList = allergens?.flat()

  const Component = ({ component }: { component: Component }) => {
    return (
      <List>
        <ListItem fontWeight="bold">{component.name}</ListItem>
        <ListItem>{component.description}</ListItem>{' '}
      </List>
    )
  }

  const Allergen = ({ allergenName }: { allergenName: string }) => {
    return <ListItem>{allergenName}</ListItem>
  }

  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize="lg"
          fontWeight={500}
          textColor="gray.500"
          textTransform="uppercase"
          fontFamily={'heading'}
        >{`${props.dish?.menu[0]?.name} - ${props.dish?.menuSection[0]?.name}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex mb={6}>
            <Image
              src={IMAGE}
              fit="cover"
              rounded={'md'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
              alt={'product image'}
            />
          </Flex>
          <Stack>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {props.dish.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >{`$${props.dish.price}`}</Text>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}
                >
                  {props.dish.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Components
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  {components?.map((component: Component) => {
                    return (
                      <Component key={component.id} component={component} />
                    )
                  })}
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Common Allergens
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  <List>
                    {allergenList?.map(allergen => {
                      if (allergen)
                        return (
                          <Allergen
                            key={allergen.id}
                            allergenName={allergen.name}
                          />
                        )
                    })}
                  </List>
                </SimpleGrid>
              </Box>
              <Stack mt={6} direction={'column'} spacing={2} align={'start'}>
                <Flex align={'center'} gap={2}>
                  <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt="Author"
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Stack direction={'row'} spacing={2} fontSize={'sm'}>
                      <Text color={'gray.500'}>Last edited:</Text>
                      <Text>Feb 08, 2021</Text>
                    </Stack>
                    <Stack direction={'row'} spacing={2} fontSize={'sm'}>
                      <Text color={'gray.500'}>By:</Text>
                      <Text fontWeight={600}>Achim Rolle</Text>
                    </Stack>
                  </Stack>
                </Flex>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

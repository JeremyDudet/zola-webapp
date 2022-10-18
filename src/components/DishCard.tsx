import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Flex
} from '@chakra-ui/react'
import { Dish, Menu, Component, MenuSection } from '../types'

interface Props {
  dish: Dish
}

export default function Index({ dish }: Props) {
  const IMAGE =
    'https://res.cloudinary.com/zola-barzola/image/upload/v1665788285/IMG_8139_kod9jp.jpg'

  // in an array of menus - add an & before the last menu instead of a comma
  const menuList = () => {
    const menus = dish.menu
    let menuString = ''
    menus?.forEach((menu: Menu, index?: number) => {
      // if this is the first one, don't add an & or comma
      if (index === 0) {
        menuString += menu.name
      }
      // if menus.length is longer than 1, and this is the last one, add an & before it
      if (menus.length !== 1 && index === menus.length - 1) {
        menuString += ` & ${menu.name}`
      }
      // if this is neither the first nor last, add a comma
      if (index !== 0 && index !== menus.length - 1) {
        menuString += `, ${menu.name}`
      }
    })
    return (menuString += ' menu')
  }

  // this function returns an array of components
  //   const componentList = () => {
  //     const components = dish.components
  //     let componentString = ''
  //     components?.forEach((component: Component, index: number) => {
  //       // if this is the first one, don't add an & or comma
  //       if (index === 0) {
  //         componentString += component.name
  //       }
  //       // if this is the last one, add an & before it
  //       if (index === components.length - 1) {
  //         componentString += ` & ${component.name}`
  //       }
  //       // if this is neither the first nor last, add a comma
  //       if (index !== 0 && index !== components.length - 1) {
  //         componentString += `, ${component.name}`
  //       }
  //     })
  //     return componentString
  //   }

  //   function components() {
  //     const components: string[] = []
  //     if (dish.components) {
  //       dish.components.forEach((component: Component) => {
  //         components.push(component.name)
  //       })
  //     }
  //     return components
  //   }

  //   const allergenList = () => {
  //     const components = dish.components
  //     let allergenString = ''
  //     components?.forEach((component: Component, index: number) => {
  //       // if this is the first one, don't add an & or comma
  //       if (index === 0) {
  //         allergenString += component.allergens[0]?.name
  //       }
  //       // if this is the last one, add an & before it
  //       if (index === components.length - 1) {
  //         allergenString += ` & ${component.allergens[0]?.name}`
  //       }
  //       // if this is neither the first nor last, add a comma
  //       if (index !== 0 && index !== components.length - 1) {
  //         allergenString += `, ${component.allergens[0]?.name}`
  //       }
  //     })
  //     return allergenString
  //   }

  return (
    <>
      <Flex flexDirection="column">
        <Flex alignItems="start" gap="10px">
          <Box
            minW="3rem"
            minH="3rem"
            maxW="3rem"
            maxH="3rem"
            width="3rem"
            height="3rem"
            borderRadius="50%"
            overflow="hidden"
            position="relative"
            boxShadow="base"
          >
            <Image
              src={IMAGE}
              layout="responsive"
              alt="picture of food"
              width="3rem"
              height="3rem"
            />
          </Box>
          <Flex flexDir="column" width="100%" height="100%">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Heading fontSize="lg" textTransform="uppercase">
                {dish.name}
              </Heading>
              <Text
                justifySelf="flex-end"
                fontSize="14px"
                fontWeight="semibold"
              >{`${dish.price}`}</Text>
            </Flex>
            <Text fontSize="xs" textTransform="uppercase">
              {dish.advertisedDescription}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

import Logo from '../Logo'
import NextLink from 'next/link'
import ThemeToggleButton from '../theme-toggle-button'
import { useUserContext } from '../../context/UserContext'
import {
  Box,
  Flex,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
  Link
} from '@chakra-ui/react'
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { FaBell, FaRss, FaClipboardCheck } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md'
import { HiCollection, HiCode } from 'react-icons/hi'
import { AiFillGift } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs'
import { userAgent } from 'next/server'

// todo
//

const Main = ({ children, router }) => {
  const path = router.asPath
  const { user } = useUserContext()
  const sidebar = useDisclosure()
  const color = useColorModeValue('gray.600', 'gray.300')

  const NavItem = ({ icon, children, href, path }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
    const activeColor = useColorModeValue('gray800', 'whiteAlpha.900')
    return (
      <NextLink href={href} passHref>
        <Link
          p={2}
          bg={active ? 'glassTeal' : undefined}
          color={active ? activeColor : inactiveColor}
        >
          <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color="inherit"
            _dark={{
              color: 'gray.400'
            }}
            _hover={{
              bg: 'gray.100',
              _dark: {
                bg: 'gray.900'
              },
              color: 'gray.900'
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
          >
            {icon && (
              <Icon
                mx="2"
                boxSize="4"
                _groupHover={{
                  color: color
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      </NextLink>
    )
  }

  const SidebarContent = () => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: 'gray.800'
      }}
      color="inherit"
      borderRightWidth="1px"
      w="60"
    >
      <Flex px="4" py="5" align="center">
        <Logo />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome} path={path} href="/">
          Home
        </NavItem>
        <NavItem icon={FaRss} path={path} href="/tasks">
          Tasks
        </NavItem>
        <NavItem icon={HiCollection} path={path} href="/food-notes">
          Food Notes
        </NavItem>
        <NavItem icon={FaClipboardCheck} path={path} href="/videos">
          Videos
        </NavItem>
      </Flex>
    </Box>
  )

  // check if there is a logged in user
  // if not, hide the sidebar
  if (!user) return <Center pt="5rem">{children}</Center>

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: 'gray.700'
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: 'none',
          md: 'unset'
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="flex-end"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: 'gray.800'
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <Flex align="center" gap={2}>
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <ThemeToggleButton />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Main

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
  Link,
  Divider,
  Heading,
  IconButton,
  Text
} from '@chakra-ui/react'
import { CheckCircleIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { FaBell, FaClipboardCheck } from 'react-icons/fa'
import { MdHome } from 'react-icons/md'
import { HiCollection } from 'react-icons/hi'
import { ImShuffle } from 'react-icons/im'

// todo
// [] add logout button

const Main = ({ children, router }) => {
  const path = router.asPath
  const { user, logOut } = useUserContext()
  const sidebar = useDisclosure()
  const color = useColorModeValue('gray.600', 'gray.300')

  const SwitchUser = ({ icon }) => {
    return (
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
        onClick={() => logOut()}
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
        Switch User
      </Flex>
    )
  }

  const NavItem = ({ icon, children, href, path }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
    const activeColor = useColorModeValue('gray800', 'whiteAlpha.900')
    return (
      <NextLink href={href} passHref>
        <Link
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

  const SidebarHeading = ({ children }) => (
    <Text as="h6" size="sm" color="gray.500" pl={6} mt={4} fontStyle="normal">
      {children}
    </Text>
  )

  const SidebarContent = () => (
    <Box
      border={{
        base: 'none',
        md: ''
      }}
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
        <SidebarHeading>Information</SidebarHeading>
        <NavItem icon={CheckCircleIcon} path={path} href="/tasks">
          Tasks
        </NavItem>
        <NavItem icon={HiCollection} path={path} href="/food-notes">
          Food Notes
        </NavItem>
        <NavItem icon={FaClipboardCheck} path={path} href="/videos">
          Videos
        </NavItem>
        <NavItem icon={FaClipboardCheck} path={path} href="/seating-charts">
          Seating Charts
        </NavItem>
        <SidebarHeading>Applications</SidebarHeading>
        <NavItem icon={FaClipboardCheck} path={path} href="/videos">
          Food Notes Manager
        </NavItem>
        <SwitchUser icon={ImShuffle} />
      </Flex>
    </Box>
  )

  // check if there is a logged in user
  // if not, hide the sidebar
  if (!user.firstName) return <Center pt="5rem">{children}</Center>

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: 'gray.700'
      }}
      minH="100vh"
    >
      <Box display={{ base: 'none', md: 'unset' }} w="60">
        <SidebarContent />
      </Box>
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent />
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
          justify="space-between"
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
          <Box>
            <Box
              display={{
                base: 'block',
                md: 'none'
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Flex align="center" gap={2}>
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <ThemeToggleButton />
            <IconButton
              aria-label="Open Menu"
              display={{ base: 'inline-flex', md: 'none' }}
              icon={<HamburgerIcon boxSize={5} />}
              onClick={
                sidebar.isOpen === true ? sidebar.onClose : sidebar.onOpen
              }
            />
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

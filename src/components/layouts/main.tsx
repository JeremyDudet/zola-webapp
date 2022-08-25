import Logo from '../Logo'
import ThemeToggleButton from '../theme-toggle-button'
import {
  Box,
  Flex,
  Icon,
  Collapse,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Input,
  IconButton,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { FaBell, FaRss, FaClipboardCheck } from 'react-icons/fa'
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md'
import { HiCollection, HiCode } from 'react-icons/hi'
import { AiFillGift } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs'

const Main = ({ children, router }) => {
  const sidebar = useDisclosure()
  const integrations = useDisclosure()
  const color = useColorModeValue('gray.600', 'gray.300')

  const NavItem = props => {
    const { icon, children, ...rest } = props
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
        {...rest}
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
    )
  }

  const SidebarContent = props => (
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
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
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
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && 'rotate(90deg)'}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  )

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

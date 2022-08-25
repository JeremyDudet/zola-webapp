import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      variant="ghost"
      aria-label="Toggle theme"
      colorScheme={useColorModeValue('purple', 'orange')}
      icon={useColorModeValue(
        <MoonIcon boxSize={4} />,
        <SunIcon boxSize={4} />
      )}
      onClick={toggleColorMode}
    ></IconButton>
  )
}

export default ThemeToggleButton

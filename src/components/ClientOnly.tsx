import React from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

function ClientOnly({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return <div>Loading...</div>
  }
  return <Box {...delegated}>{children}</Box>
}

export default ClientOnly

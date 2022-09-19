import { Box, Heading } from '@chakra-ui/react'

interface Props {
  id: string
  lemonAmount: number
  orangeAmount: number
  grapefruitAmount: number
  notes: string
  createdAt: Date
  lastEdited: Date
}

export default function JuiceRequestCard(props: Props) {
  return (
    <Box>
      <Heading>Request</Heading>
      <p>{`Lemon Amount: ${props.lemonAmount}`}</p>
      <p>{`Orange Amount: ${props.orangeAmount}`}</p>
      <p>{`Grapefruit Amount: ${props.grapefruitAmount}`}</p>
      <p>{`Notes: ${props.notes}`}</p>
      <p>{`Created at: ${props.createdAt}`}</p>
      <p>{`Last edited: ${props.lastEdited}`}</p>
    </Box>
  )
}

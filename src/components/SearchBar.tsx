import React from 'react'
import { InputGroup, Stack, InputLeftElement, Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          value={search}
          placeholder="Search Users"
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
    </Stack>
  )
}

export default SearchBar

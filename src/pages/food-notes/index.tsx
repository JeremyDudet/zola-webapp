/*
  This page is the main page for the food notes.
  Here authorized users can add, edit, and delete food notes.
*/

import { useState, useEffect, useCallback } from 'react'
import { trpc } from '../../utils/trpc'
import {
  Heading,
  HStack,
  Stack,
  Flex,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  IconButton,
  Table,
  Tbody,
  Td,
  Tr
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import SearchBar from '../../components/SearchBar'
import DishCard from '../../components/DishCard'
import LoginForm from '../../components/LoginForm'
import NewDishModal from '../../components/NewDishModal'
import { useAuthContext } from '../../context/AuthContext'
import type { Dish, NewDish } from '../../types'
import UpdateFoodNoteModal from '../../components/UpdateFoodNoteModal'

export default function Index() {
  const { user } = useAuthContext()
  const utils = trpc.useContext()
  // const createDish = trpc.useMutation('dishes.createDish')
  const getDishes = trpc.useQuery(['dishes.getDishes'])
  // const updateDish = trpc.useMutation('dishes.updateDish')
  const deleteDish = trpc.useMutation('dishes.deleteDish')
  const [search, setSearch] = useState<string>('')
  const [dishes, setDishes] = useState<Dish[] | undefined>()

  // this updates the UI when the userQuery data is first loaded.
  useEffect(() => {
    if (getDishes.isFetching) setDishes(undefined)
    if (getDishes.isFetched) setDishes(getDishes.data)
  }, [getDishes.data, getDishes.isFetched, getDishes.isFetching])

  // const handleDishDelete = useCallback(
  //   async (uid: string) => {
  //     await deleteDish.mutateAsync(
  //       { id: uid },
  //       {
  //         onSuccess: () => {
  //           utils.invalidateQueries(['dishes.getDishes'])
  //         }
  //       }
  //     )
  //   },
  //   [deleteDish, utils]
  // )

  // const handleDishUpdate = useCallback(
  //   async (data: Dish) => {
  //     await updateDish.mutateAsync(data, {
  //       onSuccess: () => {
  //         utils.invalidateQueries(['dishes.getDishes'])
  //       }
  //     })
  //   },
  //   [updateDish, utils]
  // )

  // const handleCreateDish = useCallback(
  //   async (data: NewDish) => {
  //     await createDish.mutateAsync(data, {
  //       onSuccess: () => {
  //         utils.invalidateQueries(['dishes.getDishes'])
  //       }
  //     })
  //   },
  //   [createDish, utils]
  // )

  if (!user.firstName) return <LoginForm /> // if user is not logged in, return Auth component

  return (
    <>
      {/* <NewDishModal
        handleCreateDish={handleCreateDish}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
      <Stack>
        <Flex justify="space-between">
          <Heading>{'Food Notes'}</Heading>
          <Button variant="outline" leftIcon={<AddIcon />} colorScheme="green">
            New Dish
          </Button>
        </Flex>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search by name, component, allergen, or menu"
        />

        {dishes && dishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
      </Stack>
    </>
  )
}

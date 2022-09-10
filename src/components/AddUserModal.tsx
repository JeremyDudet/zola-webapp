/*
    This is a modal that pops up when the user clicks on Add User.
    It contains a form to add a user.

    On submit: 
        the user will be added to the database,
        and the page will refresh. Closing the modal.

    On close:
    if the user has entered data into the form, 
        a confirmation modal will pop up. 
            If the user clicks Yes, 
                the modal will close and the data will be lost.
            If the user clicks No,
                the modal will stay open.
    if the user has not entered data into the form,
        the modal will close.
*/

import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function AddUserModal({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
              {/* Here I'll add a New User form */}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddUserModal

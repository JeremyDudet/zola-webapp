import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function UpdateFoodNoteModal(props: Props) {
  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Food Note</ModalHeader>
      </ModalContent>
      UpdateFoodNoteModal
    </Modal>
  )
}

export default UpdateFoodNoteModal

/*
    This modal opens up when the user does a long press on a dish card.
*/

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function UpdateFoodNoteModal(props: Props) {
  const [files, setFiles] = React.useState<FileList | null>()

  const uploadImage = (files: FileList | null | undefined) => {
    const data: any = new FormData()
    if (files) {
      data.append('file', files[0])
    } else {
      return
    }
    data.append('upload_preset', 'faoqsdvt')
    fetch('https://api.cloudinary.com/v1_1/zola-barzola/image/upload', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Food Note</ModalHeader>
        <ModalBody>
          <p>Update Food Note</p>
          <input
            type="file"
            onChange={event => {
              setFiles(event.target.files)
            }}
          />
          <button onClick={() => uploadImage(files)}>Upload Image</button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UpdateFoodNoteModal

/*
    This modal opens up when the user does a long press on a dish card.
*/

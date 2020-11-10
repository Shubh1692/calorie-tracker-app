import React from 'react';
import { Button, Modal } from 'semantic-ui-react'

const DeleteUser = ({
  open, handleClose, handleDelete
}) => {
  return (
    <Modal closeOnDimmerClick={false}size={'mini'} open={open} onClose={handleClose}>
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>
        <p>Do you want to delete this user?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleDelete} primary>DELETE</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteUser;
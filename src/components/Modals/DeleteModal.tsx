import React from "react"
import { Button, Form } from "react-bootstrap"
import Modal from "../Modal"

interface Props {
  rowIndex: number
  isDeleteShow: boolean
  onHide: () => void
  deleteField: (id: number) => void
}

const DeleteModal = ({
  isDeleteShow,
  onHide,
  rowIndex,
  deleteField,
}: Props) => {
  if (!isDeleteShow) return null

  return (
    <Modal modalHeading="Delete field?" onHide={onHide}>
      <Form className="d-flex flex-column">
        <Form.Label className="text-center mt-4">
          Do you really want to delete this field?
        </Form.Label>
        <Form.Group className="d-flex justify-content-between mt-4 gap-5">
          <Button
            className="w-50"
            variant="outline-danger"
            size="sm"
            onClick={() => deleteField(rowIndex)}
          >
            Yes
          </Button>
          <Button
            className="w-50"
            variant="outline-secondary"
            size="sm"
            onClick={onHide}
          >
            No
          </Button>
        </Form.Group>
      </Form>
    </Modal>
  )
}

export default DeleteModal

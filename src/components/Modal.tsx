import BModal from "react-bootstrap/Modal"

interface Props {
  children: JSX.Element
  onHide: () => void
  modalHeading: string
}

const Modal = ({ children, onHide, modalHeading }: Props) => {
  return (
    <BModal
      onHide={onHide}
      show={true}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BModal.Header closeButton>
        <BModal.Title>{modalHeading}</BModal.Title>
      </BModal.Header>
      <BModal.Body>{children}</BModal.Body>
    </BModal>
  )
}

export default Modal

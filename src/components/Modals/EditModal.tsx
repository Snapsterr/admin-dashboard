import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { editTransactionStatus } from "../../store/slices/transactionsSlice"
import { DefaultStatus } from "../../types/typings"
import { filterByStatus } from "../../utils/filters"
import Modal from "../Modal"
import Select from "../Select"

const Error = styled.div`
  color: #cd3535;
  font-size: 12px;
  line-height: 100%;
  font-weight: 600;
`

interface Props {
  isEditShow: boolean
  rowIndex: number
  onHide: () => void
}

const EditModal = ({ rowIndex, onHide, isEditShow }: Props) => {
  const dispatch = useAppDispatch()

  const [selectEmpty, setSelectEmpty] = useState<boolean>(false)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { status: "" },
  })

  const onSubmitHandler = (data: DefaultStatus) => {
    setSelectEmpty(false)
    console.log(data, rowIndex)
    const { status } = data
    if (status === "") return setSelectEmpty(true)
    dispatch(editTransactionStatus({ id: rowIndex, status }))
    reset()
    onHide()
  }

  if (!isEditShow) return null

  return (
    <Modal modalHeading="Edit field?" onHide={onHide}>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Label className="mt-1 mb-3">
          Change transaction status to:
        </Form.Label>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Select
              options={filterByStatus}
              onChange={onChange}
              selectPlaceholder="Status"
              value={value}
            />
          )}
        />
        <Error>{selectEmpty ? "*Select status" : null}</Error>
        <Form.Group className="d-flex justify-content-between mt-5">
          <Button type="submit" variant="outline-success">
            Save changes
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Decline
          </Button>
        </Form.Group>
      </Form>
    </Modal>
  )
}

export default EditModal

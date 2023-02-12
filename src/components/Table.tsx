import BTable from "react-bootstrap/Table"
import { useState } from "react"
import TableRowContent from "./TableRowContent"
import { Button, Form, Spinner } from "react-bootstrap"
import Modal from "./Modal"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import {
  deleteTransactionField,
  editTransactionStatus,
} from "../store/slices/transactionsSlice"
import Select from "./Select"
import { filterByStatus } from "../utils/filters"
import { Controller, useForm } from "react-hook-form"
import styled, { keyframes } from "styled-components"
import { DefaultStatus, TableData } from "../types/typings"

const Error = styled.div`
  color: #cd3535;
  font-size: 12px;
  line-height: 100%;
  font-weight: 600;
`

const SpinnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: 575px) {
    height: 60vh;
  }
`
const spin = keyframes`
0% { transform: translate(-50%, -50%) rotate(0deg) }
100% { transform: translate(-50%, -50%) rotate(360deg) }
`

const MidPageSpinner = styled(Spinner)`
  position: absolute;
  width: 16rem;
  height: 16rem;
  top: 50%;
  left: 50%;
  border-width: 1.2em;
  transform: translate(-50%, -50%) rotate(0deg);
  animation: ${spin} 0.75s linear infinite;
`

interface Props {
  transactions: TableData[]
}

const Table = ({ transactions }: Props) => {
  const dispatch = useAppDispatch()

  const { pageNumber, isLoading } = useAppSelector(
    (state) => state.transactionsSlice
  )

  const [isEditShow, setIsEditShow] = useState<boolean>(false)
  const [isDeleteShow, setIsDeleteShow] = useState<boolean>(false)
  const [rowIndex, setRowIndex] = useState<number>(0)
  const [selectEmpty, setSelectEmpty] = useState<boolean>(false)

  const dataPerPage = 10

  const showEditModal = (id: number) => {
    setRowIndex(id)
    setIsEditShow(true)
  }

  const showDeleteModal = (id: number) => {
    setRowIndex(id)
    setIsDeleteShow(true)
  }

  const deleteField = (id: number) => {
    if (id === null) return
    dispatch(deleteTransactionField(id))
    setIsDeleteShow(false)
    setRowIndex(0)
  }

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
    setIsEditShow(false)
  }

  if (isLoading)
    return (
      <SpinnerWrapper>
        <MidPageSpinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </MidPageSpinner>
      </SpinnerWrapper>
    )

  if (!transactions.length)
    return <div>No actual data by chosen filters. Try another filter</div>

  return (
    <>
      <BTable
        className="w-100"
        striped
        bordered
        responsive="md overflow-auto w-100"
      >
        <thead>
          <tr className="text-center text-nowrap">
            {Object.keys(transactions[0]).map((title, id) => (
              <th key={id}>{title}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .slice(dataPerPage * (pageNumber - 1), dataPerPage * pageNumber)
            .map((item, id) => (
              <TableRowContent
                row={item}
                key={id}
                id={item.TransactionId}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
              />
            ))}
        </tbody>
      </BTable>
      {isEditShow ? (
        <Modal modalHeading="Edit field?" onHide={() => setIsEditShow(false)}>
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
              <Button
                onClick={() => setIsEditShow(false)}
                variant="outline-danger"
              >
                Decline
              </Button>
            </Form.Group>
          </Form>
        </Modal>
      ) : null}
      {isDeleteShow ? (
        <Modal
          modalHeading="Delete field?"
          onHide={() => setIsDeleteShow(false)}
        >
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
                onClick={() => setIsDeleteShow(false)}
              >
                No
              </Button>
            </Form.Group>
          </Form>
        </Modal>
      ) : null}
    </>
  )
}

export default Table

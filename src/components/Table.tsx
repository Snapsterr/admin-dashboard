import BTable from "react-bootstrap/Table"
import { useState } from "react"
import TableRowContent from "./TableRowContent"
import { Spinner } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { deleteTransactionField } from "../store/slices/transactionsSlice"
import styled, { keyframes } from "styled-components"
import EditModal from "./Modals/EditModal"
import DeleteModal from "./Modals/DeleteModal"

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
  transactions: Transaction[]
}

const Table = ({ transactions }: Props) => {
  const dispatch = useAppDispatch()

  const { pageNumber, isLoading } = useAppSelector(
    (state) => state.transactionsSlice
  )

  const [isEditShow, setIsEditShow] = useState<boolean>(false)
  const [isDeleteShow, setIsDeleteShow] = useState<boolean>(false)
  const [rowIndex, setRowIndex] = useState<number>(0)

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

  const closeEditModal = () => {
    setIsEditShow(false)
  }

  const closeDeleteModal = () => {
    setIsDeleteShow(false)
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
            .map((item) => (
              <TableRowContent
                row={item}
                key={item.TransactionId}
                id={item.TransactionId}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
              />
            ))}
        </tbody>
      </BTable>
      <EditModal
        isEditShow={isEditShow}
        rowIndex={rowIndex}
        onHide={closeEditModal}
      />
      <DeleteModal
        isDeleteShow={isDeleteShow}
        rowIndex={rowIndex}
        onHide={closeDeleteModal}
        deleteField={deleteField}
      />
    </>
  )
}

export default Table

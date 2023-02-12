import { useEffect } from "react"
import { Form } from "react-bootstrap"
import Table from "./Table"
import PaginationComponent from "./CustomPagination"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { getTransactionsFetch } from "../store/slices/transactionsSlice"
import FilterByStatus from "./FiterByStatus"
import FilterByType from "./FilterByType"
import FileManipulateButtons from "./FileManipulateButtons"
import { filterData } from "../utils/filterData"
import styled from "styled-components"

const TabPanel = styled.div`
  width: 100%;
  height: calc(100vh - 104px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  @media (max-width: 575px) {
    height: 100%;
  }
`

const Controls = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`

const DashboardSection = () => {
  const dispatch = useAppDispatch()

  const transactions = useAppSelector((state) => {
    const { transactions, statusFilter, typeFilter } = state.transactionsSlice

    return filterData(transactions, statusFilter, typeFilter)
  })

  useEffect(() => {
    dispatch(getTransactionsFetch())
  }, [])

  return (
    <TabPanel>
      <Controls>
        <Form.Group className="d-flex justify-self-start gap-2">
          <FilterByStatus />
          <FilterByType />
        </Form.Group>

        <Form.Group className="d-flex justify-self-end gap-2">
          <FileManipulateButtons transactions={transactions} />
        </Form.Group>
      </Controls>
      <Table transactions={transactions} />
      <PaginationComponent
        itemsCount={transactions.length}
        alwaysShown={false}
      />
    </TabPanel>
  )
}

export default DashboardSection

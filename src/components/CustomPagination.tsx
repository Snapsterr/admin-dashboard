import { useEffect, useState } from "react"
import Pagination from "react-bootstrap/Pagination"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { setPageNum } from "../store/slices/transactionsSlice"

const PaginationWrapper = styled(Pagination)`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: center;

  @media (max-width: 575px) {
    margin-top: 50px;
  }
`

interface Props {
  itemsCount: number
  alwaysShown: boolean
}

const PaginationComponent = ({ itemsCount, alwaysShown = true }: Props) => {
  const dispatch = useAppDispatch()
  const { pageNumber } = useAppSelector((state) => state.transactionsSlice)

  const [dataPerPage] = useState<number>(10)

  const pagesCount = Math.ceil(itemsCount / dataPerPage)
  const isPaginationShown = alwaysShown ? true : pagesCount > 1
  const isCurrentPageFirst = pageNumber === 1
  const isCurrentPageLast = pageNumber === pagesCount
  const changePage = (number: number) => {
    if (pageNumber === number) return

    dispatch(setPageNum(number))
  }

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber)
  }

  const onPreviousPageClick = () => {
    changePage(pageNumber - 1)
  }

  const onNextPageClick = () => {
    changePage(pageNumber + 1)
  }

  const setLastPageAsCurrent = () => {
    if (pagesCount && pageNumber > pagesCount) {
      dispatch(setPageNum(pagesCount))
    }
  }

  let isPageNumberOutOfRange: boolean

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumberAct = index + 1
    const isPageNumberFirst = pageNumberAct === 1
    const isPageNumberLast = pageNumberAct === pagesCount
    const isCurrentPageWithinOnePageNumbers =
      Math.abs(pageNumberAct - pageNumber) <= 2

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinOnePageNumbers
    ) {
      isPageNumberOutOfRange = false
      return (
        <Pagination.Item
          key={pageNumberAct}
          onClick={() => onPageNumberClick(pageNumberAct)}
          active={pageNumberAct === pageNumber}
        >
          {pageNumberAct}
        </Pagination.Item>
      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return (
        <Pagination.Ellipsis key={pageNumberAct} className="muted" disabled />
      )
    }

    return null
  })

  useEffect(setLastPageAsCurrent, [pagesCount])

  return (
    <>
      {isPaginationShown && (
        <PaginationWrapper>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />

          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </PaginationWrapper>
      )}
    </>
  )
}

export default PaginationComponent

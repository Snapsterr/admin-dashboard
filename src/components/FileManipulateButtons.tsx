import React, { useRef } from "react"
import { Button, Form } from "react-bootstrap"
import { jsonToCsv } from "../utils/csvParse"
import { downloadLinkCsv } from "../utils/downloadLink"
import Papa, { ParseResult } from "papaparse"
import { TableData } from "../types/typings"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { updateTransactions } from "../store/slices/transactionsSlice"

interface Props {
  transactions: TableData[]
}

const FileManipulateButtons = ({ transactions }: Props) => {
  const dispatch = useAppDispatch()

  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = fileRef.current?.files

    if (!targetFile) return null

    Papa.parse(targetFile[0], {
      dynamicTyping: true,
      download: false,
      header: true,
      delimiter: ",",
      newline: "\n",
      complete: async function (res: ParseResult<TableData>) {
        const data = res.data
        dispatch(updateTransactions(data))
      },
    })
  }

  const exportData = () => {
    const results = jsonToCsv(transactions)
    downloadLinkCsv(results, "transactions.csv")
  }

  return (
    <>
      <Form.Label
        htmlFor="files"
        className="text-nowrap form-control form-control-sm btn btn-outline-primary mb-0"
      >
        Import
      </Form.Label>
      <Form.Control
        id="files"
        type="file"
        className="d-none"
        ref={fileRef}
        onChange={handleFileSelected}
      ></Form.Control>
      <Form.Control
        as={Button}
        size="sm"
        variant="outline-primary"
        onClick={exportData}
      >
        Export
      </Form.Control>
    </>
  )
}

export default FileManipulateButtons

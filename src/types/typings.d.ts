export interface Filters {
  status: string
  type: string
}

export interface TableData {
  TransactionId: number
  Status: string
  Type: string
  ClientName: string
  Amount: string
}

interface DefaultStatus {
  status: string
}

interface DefaultType {
  type: string
}
declare module 'redux-persist/lib/storage'
interface Filters {
  status: string
  type: string
}

interface Transaction {
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

interface EditStatus {
  id: number
  status: string
}

interface TransactionsState {
  transactions: Transaction[]
  isLoading: boolean
  error: string
  statusFilter: string
  typeFilter: string
  pageNumber: number
}

interface User {
  username: string
  password: string
}

interface AuthState {
  user: User
  isLogin: boolean
  // isRegister: boolean
}
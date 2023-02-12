import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TableData } from "../../types/typings"

interface EditStatus {
  id: number
  status: string
}

interface TransactionsState {
  transactions: TableData[]
  isLoading: boolean
  error: string
  statusFilter: string
  typeFilter: string
  pageNumber: number
}

const initialState: TransactionsState = {
  transactions: [],
  isLoading: true,
  statusFilter: '',
  typeFilter: '',
  pageNumber: 1,
  error: ''
}


export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    getTransactionsFetch: (state) => {
      state.isLoading = true
    },
    getTransactionsSuccess: (state, action: PayloadAction<TableData[]>) => {
      state.transactions = action.payload
      state.isLoading = false
    },
    getTransactionsFailure: (state) => {
      state.isLoading = false
    },

  
    deleteTransactionField: (state, action: PayloadAction<number>) => {
      const objWithIdIndex = state.transactions.findIndex((obj) => obj.TransactionId === action.payload)

      if (objWithIdIndex > -1) {
        state.transactions.splice(objWithIdIndex, 1);
      }
    },

    editTransactionStatus: (state, action: PayloadAction<EditStatus>) => {
      console.log(action.payload)
      const index = state.transactions.findIndex((el) => el.TransactionId === action.payload.id)
      console.log('dsdds', state.transactions[index].Status)
      state.transactions[index].Status = action.payload.status
    },

    updateTransactions: (state, action: PayloadAction<TableData[]>) => {
      state.transactions = action.payload
      state.pageNumber = 1
      state.statusFilter = ''
      state.typeFilter = ''
    },

    updateStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
      state.pageNumber = 1
    },

    updateTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload
      state.pageNumber = 1
    },

    setPageNum: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
  },
})


export const { getTransactionsFetch, getTransactionsSuccess, getTransactionsFailure, 
  deleteTransactionField, editTransactionStatus, updateTransactions, updateStatusFilter, 
  updateTypeFilter, setPageNum} = transactionsSlice.actions

export default transactionsSlice.reducer
import { AxiosResponse } from "axios"
import {  call, put, takeEvery, } from "redux-saga/effects"
import {  getTransactionsSuccess } from "../slices/transactionsSlice"
import { TableData } from "../../types/typings"
import api from "../../mock/mockApi"


const getTransactions = () => api.get<TableData[]>("/transactions")

 function* fetchTransactionsSaga() {
  try {
    const response: AxiosResponse<TableData[]> = yield call(getTransactions)
    const data = response.data
    yield put(
      getTransactionsSuccess(data)
    );
  } catch (e: any) {
    yield console.error(e)
  }
}

function* transactionsSaga() {
  
    yield takeEvery('transactions/getTransactionsFetch', fetchTransactionsSaga)
}

export default transactionsSaga;
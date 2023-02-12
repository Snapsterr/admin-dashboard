import saga from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import transactionsSaga from './sagas/transactionsSaga'
import transactionsSlice from './slices/transactionsSlice'
// import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
  transactionsSlice,
  // authSlice
})

function* RootSaga() {
  yield fork(transactionsSaga)
}

const sagaMiddleware = saga()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    thunk: false
  }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(RootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
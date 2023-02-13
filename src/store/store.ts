import saga from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import transactionsSaga from './sagas/transactionsSaga'
import transactionsSlice from './slices/transactionsSlice'
import authSlice from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice)

const rootReducer = combineReducers({
  transactionsSlice,
  persistedReducer
})

function* RootSaga() {
  yield fork(transactionsSaga)
}

const sagaMiddleware = saga()

export const store = configureStore({
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

export const persistor = persistStore(store)
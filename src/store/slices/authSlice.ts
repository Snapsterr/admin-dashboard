import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AuthState = {
  user: {
    username: '',
    password: ''
  },
  isLogin: false,
  // isRegister: false
}


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // registerUser: (state, action: PayloadAction<User>) => {
    //   const {username, password } = action.payload

    //   state.user.username = username
    //   state.user.password = password
    //   state.isRegister = true
    //   state.isLogin = true
    // },

    loginUser: (state, action: PayloadAction<User>) => {
      const {username, password } = action.payload

      state.user.username = username
      state.user.password = password
      state.isLogin = true
    },

    logoutUser: (state) => {
      state.user.username = ''
      state.user.password = ''
      state.isLogin = false
    },
  },
})


export const { loginUser, logoutUser} = authSlice.actions

export default authSlice.reducer
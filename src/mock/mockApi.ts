// import { nanoid } from "@reduxjs/toolkit";
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockData } from "./mockData";

// const token = nanoid()

const api = axios.create({
  baseURL: '/',
});

export const mock = new MockAdapter(api, { delayResponse: 1000 })



mock.onGet("/transactions").reply(200, mockData)


// mock.onPost("/login").reply(200, {user: {
//   username: 'admin', password: 'admin'
// },
// token})


export default api
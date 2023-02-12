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


export default api
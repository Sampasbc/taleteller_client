import axios from "axios";

const apiURL = 'http://localhost'
const apiPort = ':3333'

export const api = axios.create({
  baseURL: `${apiURL}${apiPort}`
})
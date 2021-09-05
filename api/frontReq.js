import axios from 'axios'

const frontReq = axios.create({
  baseURL: process.env.APP_URL
})

export default frontReq

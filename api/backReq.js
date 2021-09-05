import axios from 'axios'

const backReq = axios.create({
  baseURL: `${process.env.APP_URL}/admin`
})

export default backReq

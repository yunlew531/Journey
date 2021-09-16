import backReq from '../backReq'

export const signOut = () => backReq.post('/login/signOut')

export const checkAuth = () =>
  backReq.post(`${process.env.APP_URL}/login/admin/check`)

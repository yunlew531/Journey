import frontReq from '../frontReq'

export const getContinents = () =>
  frontReq.get(`${process.env.APP_URL}/continents/all`)

export const register = user =>
  frontReq.post(`${process.env.APP_URL}/login/register`, user)

export const login = user => frontReq.post(`${process.env.APP_URL}/login`, user)

export const getPhotosWall = () =>
  frontReq.get(`${process.env.APP_URL}/photos-wall`)

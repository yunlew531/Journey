import frontReq from '../frontReq'

export const getContinents = () =>
  frontReq.get(`${process.env.APP_URL}/continents/all`)

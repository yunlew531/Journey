import { getContinents, register, login, getPhotosWall } from './frontend/home'
import {
  createContinent,
  deleteContinent,
  updateContinent
} from './dashboard/continents'
import { signOut, checkAuth } from './dashboard/others'
import { upLoadImg } from './dashboard/photo-wall'

// frontend
export const apiGetContinents = getContinents
export const apiRegister = register
export const apiLogin = login
export const apiSignOut = signOut
export const apiGetPhotosWall = getPhotosWall

// backend
export const apiCheckAuth = checkAuth
export const apiCreateContinent = createContinent
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent
export const apiUpLoadImg = upLoadImg

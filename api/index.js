import { getContinents, register, login } from './frontend'
import {
  createContinent,
  deleteContinent,
  updateContinent
} from './dashboard/continents'
import { signOut, checkAuth } from './dashboard/others'
import { upLoadImg } from './dashboard/photo-wall-manage'

// frontend
export const apiGetContinents = getContinents
export const apiRegister = register
export const apiLogin = login
export const apiSignOut = signOut

// backend
export const apiCheckAuth = checkAuth
export const apiCreateContinent = createContinent
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent
export const apiUpLoadImg = upLoadImg

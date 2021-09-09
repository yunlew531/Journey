import { getContinents, register, login } from './frontend'
import {
  createContinent,
  deleteContinent,
  updateContinent
} from './backend/continents'
import { signOut, checkAuth } from './backend/others'

// frontend
export const apiGetContinents = getContinents
export const apiRegister = register
export const apiLogin = login

// backend
export const apiCreateContinent = createContinent
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent
export const apiSignOut = signOut
export const apiCheckAuth = checkAuth

import { getContinents, register } from './frontend'
import {
  createContinent,
  deleteContinent,
  updateContinent
} from './backend/continents'

// frontend
export const apiGetContinents = getContinents
export const apiRegister = register

// backend
export const apiCreateContinent = createContinent
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent

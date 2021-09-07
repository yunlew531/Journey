import { getContinents, register } from './frontend'
import { deleteContinent, updateContinent } from './backend'

// frontend
export const apiGetContinents = getContinents
export const apiRegister = register

// backend
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent

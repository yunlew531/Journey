import { getContinents } from './frontend'
import { deleteContinent, updateContinent } from './backend'

// frontend
export const apiGetContinents = getContinents

// backend
export const apiDeleteContinent = deleteContinent
export const apiUpdateContinent = updateContinent

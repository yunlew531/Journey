import backReq from '../backReq'

export const createContinent = continent =>
  backReq.post('/admin/continents/create', continent)

export const deleteContinent = continentId =>
  backReq.delete(`/continents/${continentId}`)

export const updateContinent = (continentId, continent) =>
  backReq.post(`/continents/update/${continentId}`, continent)

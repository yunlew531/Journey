import backReq from '../backReq'

export const createContinent = continent =>
  backReq.post('/admin/continents/create', continent)

export const deleteContinent = continentId =>
  backReq.delete(`/admin/continents/${continentId}`)

export const updateContinent = (continentId, continent) =>
  backReq.post(`/admin/continents/update/${continentId}`, continent)

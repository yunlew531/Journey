import backReq from '@/api/backReq'

export const upLoadImg = formData =>
  backReq.post(`${process.env.APP_URL}/admin/photo/upload`, formData)

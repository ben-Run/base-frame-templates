import request from '@/utils/http'

// some demo
export async function getBaseDataList (params) {
  const data = await request({
    url: '',
    method: 'get',
    params: params
  })
  return data
}

export async function listMorningCheckPage (params) {
  const data = await request({
    url: '',
    method: 'post',
    data: params
  })
  return data
}

// 上传文件
export async function uploadFile ({ url, authorization, file }) {
  const data = await request({
    url: url,
    method: 'put',
    headers: { 'Authorization': authorization, 'Content-Type': 'application/x-www-form-urlencoded' },
    data: file
  })
  return data
}

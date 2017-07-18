import { request, config } from '../utils'
const { api } = config
const { userLogin, userLogout, userHeart, userTest } = api

export async function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}

export async function logout () {
  return request({
    url: userLogout,
    method: 'get'
  })
}

export async function heart () {
  return request({
    url: userHeart,
    method: 'post'
  })
}

export async function test (data) {
  return request({
    url: userTest,
    method: 'get',
    data
  })
}

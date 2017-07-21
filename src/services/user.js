import { request, config } from '../utils'
const { api } = config
const { userList, userAdd, userEdit, userRemove } = api

export function query(params) {
  return request({
    url: userList,
    method: 'post',
    data: params
  })
}

export function create(params) {
  return request({
    url: userAdd,
    method: 'get',
    data: params
  });
}

export async function update (params) {
  return request({
    url: userEdit,
    method: 'get',
    data: params
  });
}


export function remove(params) {
  return request({
    url: userRemove,
    method: 'get',
    data: params
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}


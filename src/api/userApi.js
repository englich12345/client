import HttpClient from '../helpers/httpclient.helper'
const endpoit = '/users/list';
export default {
  async GetUser(payload) {
    let { offset, keyword, limit, desc } = payload;
    const path = `${endpoit}/?limit=${limit}&offset=${offset}&keyword=${keyword}&desc=${desc}`;
    let response = await HttpClient.get(path)

    return response.data;
  },

  async CreateUser(params) {
    const path = endpoit;
    let response = await HttpClient.post(path, params)
    return response.data;
  },

  async UpdateUser(params, id) {
    const path = `${endpoit}/${id}`;
    let response = await HttpClient.put(path, id, params)
    return response.data;
  },

  async RemoveUser(id) {
    const path = `${endpoit}/${id}`;
    let response = await HttpClient.delete(path, id)
    return response.data;
  }
}

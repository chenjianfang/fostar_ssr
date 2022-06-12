import axios from 'axios';
const baseURL = '/';

const withCredentials = false;

async function request(options) {
  try {
    const {
      status,
      statusText,
      data = {},
    } = await axios({
      baseURL,
      withCredentials,
      ...options,
    });

    if (status !== 200) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
}

function get(url, params = {}, options = {}) {
  return request({
    method: 'get',
    url,
    params,
    ...options,
  });
}

function post(url, params = {}, options = {}) {
  return request({
    method: 'post',
    url,
    data: params,
    ...options,
  });
}

export { get, post };

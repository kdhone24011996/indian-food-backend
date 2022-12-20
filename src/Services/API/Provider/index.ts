import { axios } from '../Axios';
import { handleResponse, handleError } from '../Response';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL ="http://localhost:8000";

/** @param {string} resource */
const getAll = (resource: string) => {
  return axios.get(`${BASE_URL}/${resource}`).then(handleResponse);
  // .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const getSingle = (resource: string, id: string, queryParams = '') => {
  return axios
    .get(`${BASE_URL}/${resource}/${id}?${queryParams}`)
    .then(handleResponse);
  // .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource: string, model: object) => {
  return axios.post(`${BASE_URL}/${resource}`, model).then(handleResponse);
  // .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const put = (resource: string, id: string, model: object, queryParams = '') => {
  return axios
    .put(`${BASE_URL}/${resource}/${id}?${queryParams}`, model)
    .then(handleResponse);
  // .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource: string, id: string, model: object) => {
  return axios
    .patch(`${BASE_URL}/${resource}/${id}`, model)
    .then(handleResponse);
  // .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource: string, id: string) => {
  return axios.delete(`${BASE_URL}/${resource}/${id}`).then(handleResponse);
  // .catch(handleError);
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
};

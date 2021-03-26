/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from '..';

// PRODUCT
export const getAllProduct = () => axios.get('/getAllProduct')
  .then((response) => response.data.result)
  .catch((error) => { console.log(error); });

export const addProduct = (name) => axios.post('/addProduct', { name })
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const updateProduct = ({ id, name }) => axios.put(`/updateProduct?id=${id}`, { name })
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const deleteProduct = ({ id }) => axios.delete(`/deleteProduct?id=${id}`)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

// PARAMETER GROUP
export const getAllParameterGroup = () => axios.get('/getAllParameterGroup')
  .then((response) => response.data.result)
  .catch((error) => { console.log(error); });

export const getAllParameterGroupByProductId = (productId) => {
  console.log(`Product ID: ${productId.queryKey[1]}`);
  productId = productId.queryKey[1];
  return axios.get(`/getAllParameterGroupByProductId?productId=${productId}`)
    .then((response) => response.data.result)
    .catch((error) => { console.log(error); });
};

export const addParameterGroup = (name) => axios.post('/addParamaterGroup', { name })
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const updateParameterGroup = ({ id, name }) => axios.put(`/updateParamaterGroup?id=${id}`, { name })
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const deleteParameterGroup = ({ id }) => axios.delete(`/deleteParameterGroup?id=${id}`)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

// PARAMETER
export const getAllParameter = () => axios.get('/getAllParameter')
  .then((response) => response.data.result)
  .catch((error) => { console.log(error); });

export const addParameter = ({ name, idParamGroup }) => axios.post(`/addParameter?idParameterGroup=${idParamGroup}`, { name })
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

// PRODUCT PARAMETER
export const setupProductParameter = ({ id, form }) => axios.post(`/setupProductParameterValue?productId=${id}`, form)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

// PARAMETER VALUE
export const getAllParameterValueByParameterId = (parameterId) => {
  console.log(`Product ID: ${parameterId.queryKey[1]}`);
  parameterId = parameterId.queryKey[1];
  return axios.get(`/getAllParameterValueByParameterId?parameterId=${parameterId}`)
    .then((response) => response.data.result)
    .catch((error) => { console.log(error); });
};

export const setupParameterValue = ({ id, form }) => axios.post(`/setupParameterValue?parameterId=${id}`, form)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

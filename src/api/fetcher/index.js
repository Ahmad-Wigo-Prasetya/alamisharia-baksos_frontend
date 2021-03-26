/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from '..';

export const getAllProduct = () => axios.get('/getAllProduct')
  .then((response) => response.data.result)
  .catch((error) => console.log({ error }));

export const addProduct = (name) => axios.post('/addProduct', {
  name,
})
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const getAllParameterGroup = () => axios.get('/getAllParameterGroup')
  .then((response) => response.data.result)
  .catch((error) => console.log({ error }));

export const addParameterGroup = (name) => axios.post('/addParameterGroup', {
  name,
})
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const getAllParameter = () => axios.get('/getAllParameter')
  .then((response) => response.data.result)
  .catch((error) => console.log({ error }));

export const addParameter = (name, idParamGroup) => axios.post(`/addParameter?idParameterGroup=${idParamGroup}`, {
  name,
})
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

// export const deleteProduct = () => axios.post(`/deleteProduct`, {
//   name,
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/* eslint-disable no-console */
import axios from '..';

// PRODUCT
export const getAllDaftarPengeluaranKeluarga = () => axios.get('/getAllDaftarPengeluaranKeluarga')
  .then((response) => response.data.result)
  .catch((error) => { console.log(error); });

export const addDaftarPengeluaranKeluarga = ({ form }) => axios.post('/addDaftarPengeluaranKeluarga', form)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const updateDaftarPengeluaranKeluarga = ({ id, form }) => axios.put(`/updateDaftarPengeluaranKeluarga?id=${id}`, form)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

export const deleteDaftarPengeluaranKeluarga = ({ id }) => axios.delete(`/deleteDaftarPengeluaranKeluarga?id=${id}`)
  .then((response) => { console.log(response); })
  .catch((error) => { console.log(error); });

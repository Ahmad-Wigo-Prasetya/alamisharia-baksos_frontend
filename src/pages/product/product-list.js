/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
// import React, { Component } from 'react';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// // import ScoringDataService from '../../services/scoring.service';

// class ProductList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       products: [],
//     };
//     // this.addProduct = this.addAnggota.bind(this);
//     // this.updateProduct = this.updateAnggota.bind(this);
//     // this.deleteEmployee = this.deleteEmployee.bind(this);
//   }

//   componentDidMount() {
//     axios.get('http://localhost:3080/api/getAllProduct')
//       .then((response) => {
//         this.setState({
//           products: response.data.result,
//         });
//         console.log(response.data.result);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   // addProduct() {
//   //   this.props.history.push('/add-product');
//   // }

//   // updateProduct(id, product) {
//   //   this.props.history.push(`/update-product/${id}`);

//   //   //   this.props.history.push({
//   //   //     pathname: `/update-anggota/${id}`,
//   //   //     state: { anggotaBeingUpdated: anggota },
//   //   //   });
//   // }

//   render() {
//     const { products } = this.state;
//     return (
//       <div>
//         <div className="row">
//           <button className="btn btn-primary" onClick={() => this.addAnggota()}> +Tambah Anggota </button>
//         </div>
//         <br />
//         <div className="row">
//           <table id="table-anggota" className="table table-hover table-striped table-bordered table-sm">
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Nama Produk</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.products.map((product, index) => (
//                 <tr key={product.id}>
//                   <td>{index + 1}</td>
//                   <td>{product.name}</td>
//                   <td>
//                     <button onClick={() => this.updateProduct(product.id, product)} className="btn btn-success btn-sm">Edit</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default ProductList;

import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { urlTypes } from 'api';
import { getAllProduct, addProduct } from 'api/fetcher';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductList() {
  const [name, setName] = React.useState('');

  const classes = useStyles();
  const queryClient = new QueryClient();
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);

  const handleClickOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleClickOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const onChangeValue = (e) => {
    setName(e.target.value);
  };

  const { data, refetch, isLoading, isFetching, isError } = useQuery(
    [
      urlTypes.GETALLPRODUCT,
      {},
    ],
    // [financingListURL.FINANCING_LIST, { filter: '', search }],
    getAllProduct,
    {
      refetchOnWindowFocus: false,
      initialData: () => {
        const state = queryClient.getQueryState(
          [
            urlTypes.GETALLPRODUCT,
            {},
          ],
        );
        // If the query exists and has data that is no older than 10 seconds...
        if (state && Date.now() - state.dataUpdatedAt <= 240000 * 1000) {
          // return the individual todo
          return state.data;
        }
        return [];
      },
      onSettled: () => {
        // setBlocking(false);
      },
    },
  );

  const handleAddProduct = useMutation(
    [
      urlTypes.ADDPRODUCT,
      {},
    ],
    addProduct,
    {
      onSuccess: (res) => {
        setOpenModalAdd(false);
        setName('');
        alert('Berhasil tambah produk');
        console.log('Berhasil menambah produk');
      },
      onError: () => {
        window.snackBar.error(
          'Terjadi kesalahan sistem ketika melakukan penjadwalan',
        );
      },
      onSettled: () => refetch(),
    },
  );

  // const handleDeleteProduct = useMutation(deleteProduct, {
  //   onSuccess: (res) => {
  //     setOpenModalDelete(false);
  //     alert('Berhasil hapus produk');
  //     console.log('Berhasil menambah produk');
  //   },
  //   onError: () => {
  //     window.snackBar.error(
  //       'Terjadi kesalahan sistem ketika melakukan penjadwalan',
  //     );
  //   },
  //   onSettled: () => refetch(),
  // });

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data || []).map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpenModalDelete}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpenModalAdd}
      >
        Add Product
      </Button>
      {/* Modal to add product */}
      <Dialog open={openModalAdd} onClose={handleCloseModalAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            onChange={onChangeValue}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalAdd} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleAddProduct.mutate(name)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to confirmation delete product */}
      <Dialog open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure want to delete this product?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="default">
            No
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleCloseModalDelete}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// useEffect(() => {
//   fetch(
//     'http://localhost:3080/api/getAllProduct',
//     {
//       method: 'GET',
//     },
//   )
//     .then((res) => res.json())
//     .then((response) => {
//       setProduct(response.result);
//     })
//     .catch((error) => console.log(error));
// }, []);

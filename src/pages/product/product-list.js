/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
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
import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Snackbar,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { QueryClient, useMutation, useQuery } from 'react-query';
import { urlTypes } from 'api';
import { getAllProduct, addProduct, updateProduct, deleteProduct, setupProductParameter, getAllParameterGroupByProductId } from 'api/fetcher';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
  },
  setupParameter: {
    maxWidth: 'fit-content',
  },
}));

function Row(props) {
  const { row, onChangeProductParameterValue, refetch } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="parameterValue">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Parameter Value</TableCell>
                    <TableCell>Coefficient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.parameterValue || []).map((pv, index) => (
                    <TableRow key={pv.value}>
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell>{pv.value}</TableCell>
                      <TableCell padding="none" size="small">
                        <TextField
                          margin="dense"
                          id={pv.id}
                          size="small"
                          name={`${row.id}_${pv.id}`}
                          variant="outlined"
                          defaultValue={pv.coefficient}
                          placeholder="Insert coefficient value"
                          onChange={onChangeProductParameterValue}
                          type="number"
                          fullWidth
                          required
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* {(row.parameterValue || []).map((pv, index) => {
                    const { productParameterValue } = pv;
                    const { id, coefficient } = productParameterValue || {};
                    console.log(`ID: ${id}, Value: ${coefficient}`);
                    return (
                      <TableRow key={pv.value}>
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell>{pv.value}</TableCell>
                        <TableCell padding="none" size="small">
                          <TextField
                            margin="dense"
                            id={id || `newValue_${index}`}
                            size="small"
                            name={`${row.id}_${id || `newValue_${index}`}`}
                            variant="outlined"
                            defaultValue={coefficient || ''}
                            placeholder="Insert coefficient value"
                            onChange={onChangeProductParameterValue}
                            type="number"
                            fullWidth
                            required
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ProductList() {
  const classes = useStyles();
  const queryClient = new QueryClient();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [form, setForm] = useState([]);
  const [activeRow, setActiveRow] = React.useState({});
  const [activeSetupParameter, setActiveSetupParameter] = React.useState(false);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [openModalSetupProductParameterValue, setOpenModalSetupProductParameterValue] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleOpenModalEdit = (row) => () => {
    setActiveRow(row);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setActiveRow({});
    setOpenModalEdit(false);
  };

  const handleOpenModalDelete = (row) => () => {
    setActiveRow(row);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setActiveRow({});
    setOpenModalDelete(false);
  };

  const handleOpenModalSetupProductParameterValue = (row) => () => {
    setActiveSetupParameter(true);
    setActiveRow(row);
    setOpenModalSetupProductParameterValue(true);
  };

  const handleCloseModalSetupProductParameterValue = () => {
    setActiveSetupParameter(false);
    setOpen(false);
    setActiveRow({});
    setForm({});
    setOpenModalSetupProductParameterValue(false);
  };

  const onChangeValue = (e) => {
    setProductName(e.target.value);
  };

  const { data: productData, refetch } = useQuery(
    [
      urlTypes.GETALLPRODUCT,
      {},
    ],
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
        setProductName('');
        setMessage('Berhasil menambah produk!');
        setOpenSnackbar(true);
      },
      onError: () => {
        window.snackBar.error(
          'Terjadi kesalahan sistem ketika melakukan penjadwalan',
        );
      },
      onSettled: () => refetch(),
    },
  );

  const handleUpdateProduct = useMutation(
    [
      urlTypes.UPDATEPRODUCT,
      {},
    ],
    updateProduct,
    {
      onSuccess: (res) => {
        setOpenModalEdit(false);
        setMessage('Berhasil mengubah produk!');
        setOpenSnackbar(true);
      },
      onError: () => {
        window.snackBar.error(
          'Terjadi kesalahan sistem ketika melakukan penjadwalan',
        );
      },
      onSettled: () => refetch(),
    },
  );

  const handleDeleteProduct = useMutation(
    [
      urlTypes.DELETEPRODUCT,
      {},
    ],
    deleteProduct,
    {
      onSuccess: (res) => {
        setOpenModalDelete(false);
        setMessage('Berhasil menghapus produk!');
        setOpenSnackbar(true);
      },
      onError: () => {
        window.snackBar.error(
          'Terjadi kesalahan sistem ketika melakukan penjadwalan',
        );
      },
      onSettled: () => refetch(),
    },
  );

  const { data: parameterGroupByProductIdData, isFetching, refetch: refetchProductParameter } = useQuery(
    [
      urlTypes.GETALLPARAMETERGROUPBYPRODUCTID,
      activeRow.id,
    ],
    // Tidak ke-get kalauu pakai paramater (x) di fungsi ini
    getAllParameterGroupByProductId,
    {
      refetchOnWindowFocus: false,
      enabled: activeSetupParameter,
      initialData: () => {
        const state = queryClient.getQueryState(
          [
            urlTypes.GETALLPARAMETERGROUPBYPRODUCTID,
            activeRow.id,
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
      },
    },
  );

  console.log(parameterGroupByProductIdData);

  const handleSetupProductParameterValue = useMutation(
    [
      urlTypes.SETUPPRODUCTPARAMETER,
      {},
    ],
    setupProductParameter,
    {
      onSuccess: (res) => {
        setOpenModalSetupProductParameterValue(false);
        setProductName('');
        setForm([]);
        setMessage('Berhasil setup produk parameter!');
        setOpenSnackbar(true);
        console.log(form);
      },
      onError: () => {
        setMessage('Terjadi kesalahan!');
      },
      onSettled: () => {
        refetchProductParameter();
      },
    },
  );

  const onChangeProductParameterValue = ({ target: { id, value, name } }) => {
    const { 1: paramaterValueId } = name.split('_');
    setForm((prev) => {
      const newValue = prev.map((p) => {
        // eslint-disable-next-line eqeqeq
        if (p.parameterValue.id == paramaterValueId) {
          return {
            ...p,
            coefficient: Number(value),
          };
        }
        return p;
      });
      return [...newValue];
    });
  };

  useEffect(() => {
    const initialForm = [];
    parameterGroupByProductIdData.forEach(async (data, index) => {
      const tempParameterValue = [];
      await data.parameter.forEach((parameter) => {
        parameter.parameterValue.forEach((parameterValue) => {
          tempParameterValue.push({
            parameterValue: {
              id: parameterValue.id,
            },
            coefficient: parameterValue.coefficient,
            parameter: {
              id: parameter.id,
            },
          });
        });
      });

      const productParameterValue = tempParameterValue.map((tP) => ({
        product: {
          id: activeRow.id,
        },
        parameterGroup: {
          id: data.id,
        },
        ...tP,
      }));
      initialForm.push(...productParameterValue);
    });

    setForm(initialForm);
  }, [isFetching]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(productData || []).map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={handleOpenModalEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    variant="contained"
                    size="small"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={handleOpenModalDelete(row)}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModalSetupProductParameterValue(row)}
                  >
                    Setup Parameter
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
        onClick={handleOpenModalAdd}
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
            onClick={() => handleAddProduct.mutate(productName)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to edit product */}
      <Dialog open={openModalEdit} onClose={handleCloseModalEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Edit Product-
          {activeRow.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            defaultValue={activeRow.name}
            onChange={onChangeValue}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalEdit} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleUpdateProduct.mutate({ id: activeRow.id, productName })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to confirmation delete product */}
      <Dialog open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure want to delete {activeRow.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="default">
            No
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => handleDeleteProduct.mutate({ id: activeRow.id })}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to setup parameter */}
      <Dialog fullWidth maxWidth="md" open={openModalSetupProductParameterValue} onClose={handleCloseModalSetupProductParameterValue} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#ebebeb' }}>
          Setup Parameter - {activeRow.name}
        </DialogTitle>
        <TableContainer component={Paper}>
          <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
            {(parameterGroupByProductIdData || []).map((row, index) => (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align="center">{row.name}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.parameter.map((parameter, index) => (
                    <Row key={parameter.name} row={parameter} onChangeProductParameterValue={onChangeProductParameterValue} refetch={refetch} />
                  ))}
                </TableBody>
              </>
            ))}
          </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={handleCloseModalSetupProductParameterValue} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleSetupProductParameterValue.mutate({ id: activeRow.id, form })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar when success manipulate data */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

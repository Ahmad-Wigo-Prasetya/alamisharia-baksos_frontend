/* eslint-disable no-param-reassign */
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
import { getAllDaftarPengeluaranKeluarga, addDaftarPengeluaranKeluarga, updateDaftarPengeluaranKeluarga, deleteDaftarPengeluaranKeluarga } from 'api/fetcher';

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

export default function BaksosList() {
  const classes = useStyles();
  const queryClient = new QueryClient();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [form, setForm] = React.useState({});
  const [activeRow, setActiveRow] = React.useState({});
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);

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
    row.tanggal = new Date(row.tanggal).toISOString().slice(0, 10);
    setForm(row);
    setActiveRow(row);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setForm({});
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

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { data, refetch } = useQuery(
    [
      urlTypes.GETALLDAFTARPENGELUARANKELUARGA,
      {},
    ],
    getAllDaftarPengeluaranKeluarga,
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

  const handleAddDaftarPengeluaranKeluarga = useMutation(
    [
      urlTypes.ADDDAFTARPENGELUARANKELUARGA,
      {},
    ],
    addDaftarPengeluaranKeluarga,
    {
      onSuccess: (res) => {
        setOpenModalAdd(false);
        setForm([]);
        setMessage('Berhasil menambah daftar pengeluaran keluarga!');
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

  const handleUpdateDaftarPengeluaranKeluarga = useMutation(
    [
      urlTypes.UPDATEDAFTARPENGELUARANKELUARGA,
      {},
    ],
    updateDaftarPengeluaranKeluarga,
    {
      onSuccess: (res) => {
        setOpenModalEdit(false);
        setForm([]);
        setMessage('Berhasil mengubah daftar pengeluaran keluarga!');
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

  const handleDeleteDaftarPengeluaranKeluarga = useMutation(
    [
      urlTypes.DELETEDAFTARPENGELUARANKELUARGA,
      {},
    ],
    deleteDaftarPengeluaranKeluarga,
    {
      onSuccess: (res) => {
        setOpenModalDelete(false);
        setMessage('Berhasil menghapus daftar pengeluaran keluarga!');
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Judul</TableCell>
              <TableCell>Nilai</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data || []).map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(row.tanggal))}
                </TableCell>
                <TableCell>{row.judulPengeluaran}</TableCell>
                <TableCell>{row.nilaiDalamRupiah}</TableCell>
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
        Add Daftar Pengeluaran Keluarga
      </Button>
      {/* Modal to add product */}
      <Dialog open={openModalAdd} onClose={handleCloseModalAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Daftar Pengeluaran Keluarga</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="dense"
            name="tanggal"
            label="Tanggal"
            onChange={onChangeValue}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="judulPengeluaran"
            label="Judul"
            onChange={onChangeValue}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="nilaiDalamRupiah"
            label="Nilai"
            onChange={onChangeValue}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
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
            onClick={() => handleAddDaftarPengeluaranKeluarga.mutate({ form })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to edit product */}
      <Dialog open={openModalEdit} onClose={handleCloseModalEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Edit-{activeRow.judulPengeluaran}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="dense"
            name="tanggal"
            label="Tanggal"
            defaultValue={activeRow.tanggal}
            onChange={onChangeValue}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="judulPengeluaran"
            label="Judul"
            defaultValue={activeRow.judulPengeluaran}
            onChange={onChangeValue}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="nilaiDalamRupiah"
            label="Nilai"
            defaultValue={activeRow.nilaiDalamRupiah}
            onChange={onChangeValue}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
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
            onClick={() => handleUpdateDaftarPengeluaranKeluarga.mutate({ id: activeRow.id, form })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to confirmation delete product */}
      <Dialog open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure want to delete {activeRow.judulPengeluaran}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="default">
            No
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => handleDeleteDaftarPengeluaranKeluarga.mutate({ id: activeRow.id })}
          >
            Yes
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

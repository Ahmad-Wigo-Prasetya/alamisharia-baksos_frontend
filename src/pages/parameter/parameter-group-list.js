/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
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
  Divider,
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
  Typography,
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
import { getAllParameterGroup, addParameterGroup, updateParameterGroup, deleteParameterGroup, addParameter, setupParameterValue } from 'api/fetcher';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Row(props) {
  const { row, idx, refetch } = props;
  const [activeParameter, setActiveParameter] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSetupParameterValue, setOpenModalSetupParameterValue] = useState(false);
  const classes = useRowStyles();

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

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleOpenModalSetupParameterValue = (parameterRow) => {
    const tempForm = [];
    setActiveParameter(parameterRow);
    parameterRow.parameterValue.forEach((PV) => tempForm.push(PV));
    for (let i = parameterRow.parameterValue.length; i < 10; i++) {
      tempForm.push({
        id: `newPV_${i}`,
        value: '0',
      });
    }
    tempForm.sort((a, b) => a.id - b.id);
    console.log(tempForm);
    setForm(tempForm);
    setOpenModalSetupParameterValue(true);
  };

  const handleCloseModalSetupParameterValue = () => {
    setActiveParameter({});
    setForm([]);
    setOpenModalSetupParameterValue(false);
  };

  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const onChangeValue = (e) => {
    setName(e.target.value);
  };

  const handleAddParameter = useMutation(
    [
      urlTypes.ADDPARAMETER,
      {},
    ],
    addParameter,
    {
      onSuccess: (res) => {
        setOpenModalAdd(false);
        setName('');
        setMessage('Berhasil menambah parameter!');
        setOpenSnackbar(true);
      },
      onError: () => {
        window.snackBar.error(
          'Terjadi kesalahan sistem ketika melakukan penjadwalan.',
        );
      },
      onSettled: () => refetch(),
    },
  );

  const handleUpdateParameterGroup = useMutation(
    [
      urlTypes.UPDATEPARAMETERGROUP,
      {},
    ],
    updateParameterGroup,
    {
      onSuccess: (res) => {
        setOpenModalEdit(false);
        setName('');
        setMessage('Berhasil mengubah parameter grup!');
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

  const handleDeleteParameterGroup = useMutation(
    [
      urlTypes.DELETEPARAMETERGROUP,
      {},
    ],
    deleteParameterGroup,
    {
      onSuccess: (res) => {
        setOpenModalDelete(false);
        setName('');
        setMessage('Berhasil menghapus parameter grup!');
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

  const handleSetupParameterValue = useMutation(
    [
      urlTypes.SETUPPARAMETERVALUE,
      {},
    ],
    setupParameterValue,
    {
      onSuccess: (res) => {
        setOpenModalSetupParameterValue(false);
        setName('');
        setMessage('Berhasil setup parameter value!');
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

  const onChangeParameterValue = ({ target: { name: PVName, value } }) => {
    const { 1: parameterValueId } = PVName.split('_');
    // console.log(`${parameterValueType} - ${parameterValueId} - ${value}`);
    // console.log(`PV Name: ${PVName}`);
    setForm((prev) => {
      const newValue = prev.map((PV) => {
        if ((PV.id == parameterValueId) || (PV.id == PVName)) {
          return {
            ...PV,
            value,
          };
        }
        return PV;
      });
      return [...newValue];
    });
  };

  const onClikSetupParameterValue = () => {
    form.forEach((PV) => {
      try {
        delete PV.coefficient;
        if (PV.id.includes('newPV')) {
          delete PV.id;
        }
      } catch (err) { }
    });

    const finalForm = form.filter((pv) => pv.value != '0');

    console.log(finalForm);
    handleSetupParameterValue.mutate({ id: activeParameter.id, form: finalForm });
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>{idx}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            color="default"
            defaultValue={row.name}
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={handleOpenModalEdit}
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
            onClick={handleOpenModalDelete}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.parameter.length !== 0 ? (
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(row.parameter || []).map((parameter, index) => (
                      <TableRow key={parameter.name}>
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell>{parameter.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenModalSetupParameterValue(parameter)}
                          >
                            Setup Parameter Value
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )
              : <DialogContentText>Belum ada parameter. Silahkan klik  &quot;Add Parameter&quot; untuk menambahkan.</DialogContentText>}

            <Button
              style={{ margin: '10px' }}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onChange={onChangeValue}
              onClick={handleOpenModalAdd}
            >
              Add Parameter
            </Button>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Modal to edit product */}
      <Dialog open={openModalEdit} onClose={handleCloseModalEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Edit Product-
          {row.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            defaultValue={row.name}
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
            onClick={() => handleUpdateParameterGroup.mutate({ id: row.id, name })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to confirmation delete product */}
      <Dialog open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure want to delete {row.name}?</DialogContentText>
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

      {/* Modal to add parameter */}
      <Dialog open={openModalAdd} onClose={handleCloseModalAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Parameter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Parameter Name"
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
            onClick={() => handleAddParameter.mutate({ name, idParamGroup: row.id })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to setup parameter value */}
      <Dialog open={openModalSetupParameterValue} onClose={handleCloseModalSetupParameterValue} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Setup Parameter - {activeParameter.name}
        </DialogTitle>
        {openModalSetupParameterValue
          && (
            <DialogContent>
              {form.map((PV, index) => (
                <TextField
                  margin="dense"
                  size="small"
                  variant="outlined"
                  name={activeParameter.parameterValue[index] !== undefined ? `oldPV_${PV.id}` : PV.id}
                  defaultValue={activeParameter.parameterValue[index] !== undefined ? PV.value : ''}
                  label="Value"
                  onChange={onChangeParameterValue}
                  type="text"
                  fullWidth
                />
              ))}
            </DialogContent>
          )}
        <DialogActions>
          <Button onClick={handleCloseModalSetupParameterValue} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onClikSetupParameterValue}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function ParameterGroupList() {
  const [name, setName] = useState('');
  const [parameter, setParameter] = useState([]);
  const queryClient = new QueryClient();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const classes = useStyles();
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const onChangeValue = (e) => {
    setName(e.target.value);
  };

  const { data, refetch, isLoading, isFetching, isError } = useQuery(
    [
      urlTypes.GETALLPARAMETERGROUP,
      {},
    ],
    getAllParameterGroup,
    {
      refetchOnWindowFocus: false,
      initialData: () => {
        const state = queryClient.getQueryState(
          [
            urlTypes.GETALLPARAMETERGROUP,
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

  const handleAddParemeterGroup = useMutation(
    [
      urlTypes.ADDPARAMETERGROUP,
      {},
    ],
    addParameterGroup,
    {
      onSuccess: (res) => {
        setOpenModalAdd(false);
        setName('');
        setMessage('Berhasil menambah parameter grup!');
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
        <Table stickyHeader className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Parameter Group Name</TableCell>
              <TableCell>Parameter List</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <Row key={row.name} row={row} idx={index + 1} refetch={refetch} />
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
        Add Parameter Group
      </Button>
      {/* Modal to add product */}
      <Dialog open={openModalAdd} onClose={handleCloseModalAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Parameter Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Parameter Group Name"
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
            onClick={() => handleAddParemeterGroup.mutate(name)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

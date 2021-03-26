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
import React from 'react';
import {
  Button,
  Box,
  Collapse,
  Divider,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { QueryClient, useMutation, useQuery } from 'react-query';
import { urlTypes } from 'api';
import { getAllParameterGroup, addParameterGroup, addParameter } from 'api/fetcher';

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
  const { row, idx, idParamGroup, refetch } = props;
  // console.log(`idParamGroup: ${idParamGroup}`);
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const classes = useRowStyles();

  const handleClickOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const onChangeValue = (e) => {
    setName(e.target.value);
  };

  const handleClickOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleAddParemeter = useMutation(
    [
      urlTypes.ADDPARAMETER,
      {},
    ],
    addParameter,
    {
      onSuccess: (res) => {
        setOpenModalAdd(false);
        setName('');
        alert('Berhasil tambah parameter');
        console.log('Berhasil menambah parameter');
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
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{idx}</TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.parameter.length !== 0 ? (
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Parameter
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Parameter</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(row.parameter || []).map((parameter, index) => (
                      <TableRow key={parameter.name}>
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell>{parameter.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )
              : <DialogContentText>Belum ada parameter. Silahkan klik  &quot;Add Parameter&quot; untuk menambahkan</DialogContentText>}

            <Button
              style={{ margin: '10px' }}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onChange={onChangeValue}
              onClick={handleClickOpenModalAdd}
            >
              Add Parameter
            </Button>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Modal to confirmation delete parameter group */}
      <Dialog open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure want to delete this parameter group?</DialogContentText>
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
            onClick={() => handleAddParemeter.mutate({ name, idParamGroup })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function ParameterGroupList() {
  const [name, setName] = React.useState('');
  const [parameter, setParameter] = React.useState([]);
  const queryClient = new QueryClient();
  const classes = useStyles();
  const [openModalAdd, setOpenModalAdd] = React.useState(false);

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
    // [financingListURL.FINANCING_LIST, { filter: '', search }],
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
        alert('Berhasil tambah parameter group');
        console.log('Berhasil menambah parameter group');
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
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>No</TableCell>
              <TableCell>Parameter Group Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <Row key={row.name} row={row} idx={index + 1} idParamGroup={row.id} refetch={refetch} />
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
    </>
  );
}

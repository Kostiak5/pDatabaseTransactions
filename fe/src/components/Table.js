import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

function createData(name, size, price, payment, currency) {
  return {
    name,
    size,
    price,
    payment,
    currency,
  };
}

var rows = [];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Code',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'payment',
    numeric: true,
    disablePadding: false,
    label: 'Payment',
  },
  {
    id: 'currency',
    numeric: true,
    disablePadding: false,
    label: 'Currency',
  },
];

export default function EnhancedTable() {
  var models = [];
  var [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [curobj, setCurobj] = React.useState("");
  
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/models')
      .then((res) => {
        models = res.data;
        setRows(models);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);

  const handleClickOpen = (ob) => {
    setOpen(true);
    setCurobj(ob);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const dialog = () => {
  }
  const card = (ob, date, time, i) => (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div">
          Transaction number {i}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {time}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClickOpen(i)}>Learn More</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Name" secondary={curobj} />
          </ListItem>
        </List>
      </Dialog>

      <Button variant="text" href='/add-items' ><AddIcon /></Button>
      <Box sx={{ minWidth: 275, flexGrow: 1 }}>
        <Grid container spacing={2}>
          {rows.map((tr, trIndex) => {
              var dateUnsplit = tr.date.toString();
              const dateSplit = dateUnsplit.split(/[-T.]+/);
              var dateFinal = dateSplit[0] + "." + dateSplit[1] + "." + dateSplit[2];
              var timeFinal = dateSplit[3];
              return (
                <Grid item xs={5}>
                    <Card variant="outlined">{card(tr, dateFinal, timeFinal, trIndex + 1)}</Card>
                </Grid>
                /*ob.items.map((ob2) => {
                  return (
                    <Grid item xs={5}>
                        <Card variant="outlined">{card(ob2)}</Card>
                    </Grid>
                  );
                })*/
              );
          })}
        </Grid>
      </Box>
    </>
  );
}
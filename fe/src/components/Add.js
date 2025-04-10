import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function createData(name, name2, number, price, size, discount) {
  return {
    name, name2, number, price, size, discount
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
    label: 'Kód',
  },
  {
    id: 'name2',
    numeric: false,
    disablePadding: false,
    label: 'Název',
  },
  {
    id: 'number',
    numeric: false,
    disablePadding: false,
    label: 'Počet',
  },
  {
    id: 'size',
    numeric: false,
    disablePadding: false,
    label: 'Velikost',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Cena',
  },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
  
];

function EnhancedTableHead(props) {

  //const [models, setModels] = useState([]);

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AddItem() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [newRows2, setNewRows2] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [models, setModels] = useState([]);
  const [overallDisc, setOverallDisc] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/items`)
      .then((res) => {
        setModels(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);

  models.map((obj, i) => rows[i] = createData(obj.name, obj.name2, obj.number, obj.price, obj.size, obj.discount));


  const [item, setItem] = useState({
    name: ''
  });

  //celkova sleva
  const onChangeOverallDisc = (event) => {
    setOverallDisc(event.target.value);
  };

  const onKeyOverallDisc = (event) => {
    if (event.key === 'Enter') {
      let curPrice = 0;
      const newArray = newRows.map((item, index2) => {
        return { ...item, price: newRows2[index2].price - event.target.value};
      });
      setNewRows(newArray);
      setOverallDisc(0);
    }
  };

  //pridani polozky
  const onChangeItemSearch = (event) => {
    setItem({ ...item, name: event.target.value });
    console.log(item);
  };

  const onKeyItemSearch = (event) => {
    if (event.key === 'Enter') {
      axios
      .get(`http://localhost:8000/api/items/${item.name}`, item)
      .then((res) => {
        setItem({
          name: ''
        });
        let repeat = false;
        res.data[0].number = 1;
        for(var i = 0; i < Object.keys(newRows).length; i++) {
          if(res.data[0].name === newRows[i].name) {
            repeat = true;
            let newRowsClone = newRows;
            newRowsClone[i].number++;
            setNewRows(newRowsClone);
          }
        }
        if(!repeat) {
          setNewRows(newRows.concat(res.data));
          setNewRows2(newRows2.concat(res.data));
        }
      })
      .catch((err) => {
        console.log('Error');
      });
    }
  };

  //sleva na 1 kus
  const onChangeItemDiscount = (index) => (event) => {
      let curPrice = 0;
      console.log(event.target.value);
      const newArray = newRows.map((item, index2) => {
        if (index === index2) {
          return { ...item, price: newRows2[index2].price - event.target.value, discount: event.target.value };
        } else {
          return item;
        }
      });
      setNewRows(newArray);
  };

  const deleteItems = (event) => {
    let newRowsClone = newRows;
    newRowsClone = newRowsClone.filter(item => !selected.includes(item.name));
    console.log(newRowsClone);
    setNewRows(newRowsClone);
    setSelected([]);
  };

  const onClickSaveTr = (event) => {

    axios
      .post(`http://localhost:8000/api/models`, newRows)
      .then((res) => {
        setNewRows([]);
        navigate('/');
      })
      .catch((err) => {
        console.log('Error');
      });
  }; 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = newRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 }
            }}
          >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
              Seznam položek
            </Typography>

            <Button variant="text" href='/new-item' sx={{ width: 300 }}><AddIcon />Nová položka</Button>
            <Button variant="text" href='/'><ClearIcon />Zpět</Button>

            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Kód</TableCell>
                  <TableCell>Název</TableCell>
                  <TableCell>Počet</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell>Velikost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        key={row.name}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.name2}</TableCell>
                        <TableCell>{row.number}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.price}</TableCell>

                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 30 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
          display: "flex"
        }}
      >
         
         {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 60%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} položka / položky
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 60%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Položky v transakci
          </Typography>
        )}

        <TextField label="Zadejte položku" variant="standard" name="name"  value={item.name} onChange={onChangeItemSearch} onKeyDown={onKeyItemSearch} sx={{margin: 1, width: 600}}/>
        <TextField label="Zadejte celkovou slevu" type="number" variant="standard" name="overallDisc"  value={overallDisc} onChange={onChangeOverallDisc} onKeyDown={onKeyOverallDisc} sx={{margin: 3, width: 200}} />
        <Button variant="text" href='/'><ClearIcon />Zpět</Button>

        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteItems}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}

        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={Object.keys(newRows).length}
            />
          <TableBody>
          {stableSort(newRows, getComparator(order, orderBy)).map((row, i) => {
            const isItemSelected = isSelected(row.name);

            return( 
              <TableRow hover
                tabIndex={-1}
                key={row.name}
                sx={{
                  height: 40
                }}
                >
                <TableCell padding="checkbox"> 
                  <Checkbox
                    color="primary"
                    onClick={(event) => handleClick(event, row.name)}
                    checked={isItemSelected}
                  />
                </TableCell>
                <TableCell>{row.name} </TableCell>
                <TableCell>{row.name2}</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell><TextField variant="standard" type="number" name="discount" label="Zadejte slevu" value={row.discount} onChange={onChangeItemDiscount(i)}/></TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={onClickSaveTr} sx={{margin: 1, width: 300, fontSize: 18}}>Uložit transakci</Button>
    </div>
  );           
}
/*
<EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {newRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  <TableRow hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">{row.name} </TableCell>
                    <TableCell>{row.name2}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell><TextField id="outlined-basic" label="Zadejte slevu" value={row.discount} /></TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />

{newRows.map((row) => {
  return( 
    <TableRow key={row.name}>
      <TableCell>{row.name} </TableCell>
      <TableCell>{row.name2}</TableCell>
      <TableCell>{row.number}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.size}</TableCell>
      <TableCell><TextField id="outlined-basic" label="Zadejte slevu" value={row.discount} /></TableCell>
    </TableRow>
  );
})}
*/
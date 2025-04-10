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


export default function NewItem() {


    const onChange = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value });
        console.log(item);
    };

    const onSubmit = (event) => {
            axios
            .post(`http://localhost:8000/api/items/`, item)
            .then((res) => {
                setItem({
                    name: '',
                    name2: '',
                    number: 0,
                    size: '',
                    price: 0
                });
            })
            .catch((err) => {
            console.log('Error');
            });
    };

    const [item, setItem] = useState({
        name: '',
        name2: '',
        number: 0,
        size: '',
        price: 0
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextField label="Kód" variant="standard" name="name"  value={item.name} onChange={onChange} sx={{margin: 1, width: 600}}/>
                <TextField label="Název" variant="standard" name="name2"  value={item.name2} onChange={onChange}  sx={{margin: 1, width: 600}}/>
                <TextField label="Počet kusů" type="number" variant="standard" name="number"  value={item.number} onChange={onChange} sx={{margin: 1, width: 600}}/>
                <TextField label="Velikost" variant="standard" name="size"  value={item.size} onChange={onChange} sx={{margin: 1, width: 600}}/>
                <TextField label="Cena" type="number" variant="standard" name="price"  value={item.price} onChange={onChange} sx={{margin: 1, width: 600}}/>
                <Button variant="outlined" type="submit" sx={{margin: 1, width: 300, fontSize: 18}}>Přidat položku</Button>
            </form>
        </>

    )
}     

/*
<TextField label="Počet kusů" type="number" variant="standard" name="number"  value={item.number} onChange={onChange} sx={{margin: 1, width: 600}}/>
<TextField label="Cena" type="number" variant="standard" name="price"  value={item.price} onChange={onChange} sx={{margin: 1, width: 600}}/>

*/

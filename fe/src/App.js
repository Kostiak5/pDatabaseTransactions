import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EnhancedTable from './components/Table';
import AddItem from './components/Add';
import NewItem from './components/New';
import ViewItem from './components/Transaction';

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
          <Route path='/' element={<EnhancedTable />} />
            <Route path='/add-items' element={<AddItem />} />
            <Route path='/new-item' element={<NewItem />} />
            <Route path='/view-item' element={<ViewItem />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
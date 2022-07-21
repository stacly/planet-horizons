import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import Planets from './components/Planets';
import DwarfPlanets from './components/DwarfPlanets';
import Header from './components/Header';
import Search from './components/Search';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header><App /></Header>}></Route>
      <Route path="/planets" element={<Header><Planets /></Header>}></Route>
      <Route path="/dwarfplanets" element={<Header><DwarfPlanets /></Header>}></Route>
      <Route path="/search" element={<Header><Search /></Header>}></Route>

    </Routes>
  </BrowserRouter>
);

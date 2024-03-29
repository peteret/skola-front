import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Error from './views/Error';
import Home from './views/Home';
import Obed from './views/Obed';

import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}/>
          <Route path="/obed" element={<Obed />}/>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  </BrowserRouter>
, document.getElementById('root'));



// App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Order from './components/Order';
import Product from './components/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRouter from './utils/PrivateRouter';
import Register from './components/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRouter/>}>
            <Route path="/" element={<Product />} />
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

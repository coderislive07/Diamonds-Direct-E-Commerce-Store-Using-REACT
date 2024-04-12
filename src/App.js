import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../src/pages/Home';
import Header from '../src/components/Header';
import Cart from '../src/components/cart';
import Footer from '../src/components/footer';
import Naturaldiamond from '../src/pages/Diamonds/Naturaldiamond';
import Labgrowndiamond from './pages/Diamonds/Labgrowndiamond';
import Location from '../src/pages/Locations/location';
import Productpage from '../src/pages/Diamonds/productpage';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/naturaldiamond"element={<Naturaldiamond/>} />
          <Route path="/labgrowndiamond"element={<Labgrowndiamond/>}/>
          <Route path="/location"element={<Location/>} />
          <Route path =":pagename/:id"element={<Productpage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Video from './components/Video/Video';
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/books" element ={<Home/>}/>
          <Route path="/books/search" element ={<Home/>}/>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/video"element={<Video/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

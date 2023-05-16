import './App.css';
import React from 'react';
import Header from '../Navbar/Header.tsx'
import Main from '../Main/Main.tsx'
import Footer from '../Footer/Footer.tsx'

export default function App() {
  return (
    <div className="app">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

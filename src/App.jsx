import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/home';
import Infopage from './components/Infopage';
import Callback from './components/Callback';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route with Navbar, Sidebar, and Home */}
        <Route
          path="/"
          element={
            <div className="bg-gradient-to-b from-[#9D174D] to-black h-screen w-full p-2">
              <Navbar />
              <div className="flex gap-4">
                <Sidebar />
                <Home />
              </div>
            </div>
          }
        />
        {/* Infopage route with only Navbar */}
        <Route
          path="/infopage/:id"
          element={
            <div className="bg-gradient-to-b from-[#9D174D] to-black h-screen w-full p-2">
              <Navbar />
              <Infopage />
            </div>
          }
        />
        <Route path="/Callback" element={
          <div className="bg-gradient-to-b from-[#9D174D] to-black h-screen w-full p-2">
          <Navbar /><Callback />
          <div className="flex gap-4">
            <Sidebar />
            <Home />
          </div>
        </div>} />
        </Routes>
   
    </BrowserRouter>
  );
};

export default App;
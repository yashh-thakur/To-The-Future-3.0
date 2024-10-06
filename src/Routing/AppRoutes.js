import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from '../Pages/Homepage';
import Portfolio from '../Pages/PortFolio';
import NavigationBar from '../Pages/Navigation Bar';


const AppRoutes = () => {
  return (
    <div>
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Homepage /> }></Route>
          <Route path='/portfolio' element={<Portfolio /> }></Route>
          </Routes>
          </Router>
    </div>
  )
}

export default AppRoutes

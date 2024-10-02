import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from '../Pages/Homepage';


const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage /> }></Route>
          </Routes>
          </Router>
    </div>
  )
}

export default AppRoutes

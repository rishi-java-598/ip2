import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./components/generic/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/Protectedroute";
import Dashboard from "./components/pages/Dashboard";
import { AuthProvider } from "./components/context/Authcontext";
import Navbar from "./components/generic/HamMenu";


export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<><Home /></>} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
    </AuthProvider>
  );
}








// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import MedicalReports from './pages/MedicalRecords';
import UserProfile from './pages/UserProfile';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rapoarte" element={<MedicalReports />} />
                <Route path="/programari" element={<Appointments />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/profil"
                    element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

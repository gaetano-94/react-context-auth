import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import ElencoPost from './pages/ElencoPost';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/elenco-post" element={<ElencoPost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

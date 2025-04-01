import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // ⛔ <BrowserRouter> artık burada kullanılmayacak
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

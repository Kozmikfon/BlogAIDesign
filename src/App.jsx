import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast'; // ✅ Bildirim bileşeni

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' }); // ✅ Bildirim için state

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  // ✅ Toast'ı tetikleyen fonksiyon
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3000);
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <Routes>
        <Route path="/" element={<BlogList showToast={showToast} />} />
        <Route path="/blog/:id" element={<BlogDetail showToast={showToast} />} />
      </Routes>

      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </>
  );
};

export default App;

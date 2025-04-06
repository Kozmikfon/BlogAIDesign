import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast'; // ✅ Bildirim bileşeni
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRoute from './routes/AdminRoute'; // ✅ yeni route
import AdminEdit from './pages/admin/AdminEdit';
import CommentManager from './pages/admin/CommentManager';


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
      <Route path="/" element={<BlogList darkMode={darkMode} showToast={showToast} />} />
        <Route path="/" element={<BlogList showToast={showToast} />} />
        <Route path="/blog/:id" element={<BlogDetail showToast={showToast} />} />
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/edit/:id" element={<AdminRoute><AdminEdit /></AdminRoute>} />
        <Route path="/admin/comments" element={<AdminRoute><CommentManager /></AdminRoute>} />
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'blog58*') {
      localStorage.setItem('admin-auth', 'true');
      navigate('/admin'); // ✅ Giriş başarılıysa yönlendir
    } else {
      alert('❌ Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-3">🔐 Admin Giriş</h4>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Şifre</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLogin;

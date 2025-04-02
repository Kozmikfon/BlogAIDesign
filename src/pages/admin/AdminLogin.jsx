import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:44387/api/auth/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // ✅ JWT token kaydedildi
      navigate('/admin');
    } catch (err) {
      console.error('Giriş başarısız:', err);
      setError('❌ Kullanıcı adı veya şifre hatalı!');
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

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLogin;

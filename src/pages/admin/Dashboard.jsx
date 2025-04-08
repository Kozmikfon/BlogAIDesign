import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://localhost:44387/api/blog');
      setBlogs(res.data);
    } catch (err) {
      console.error("Blog verisi alınamadı,", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu blog yazısını silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`https://localhost:44387/api/blog/${id}`);
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch (err) {
      alert("Silme işlemi başarısız oldu!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      {/* Üst Başlık ve Butonlar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📊 Admin Paneli</h3>
        <div>
          <Link to="/admin/comments" className="btn btn-outline-info btn-sm me-2">
            💬 Yorumlar
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            🚪 Çıkış Yap
          </button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6 className="text-muted">📚 Toplam Blog</h6>
            <h4 className="text-primary">{blogs.length}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6 className="text-muted">🕒 Son Blog Tarihi</h6>
            <h5 className="text-dark">
              {blogs.length > 0
                ? new Date(blogs[0].createdAt).toLocaleString()
                : 'Henüz içerik yok'}
            </h5>
          </div>
        </div>
      </div>

      {/* Blog Listesi */}
      {blogs.length === 0 ? (
        <div className="alert alert-warning">Henüz blog eklenmemiş.</div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Başlık</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th style={{ minWidth: '140px' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>{blog.title || <i className="text-muted">Başlık yok</i>}</td>
                <td>{blog.category || <i className="text-muted">Kategori yok</i>}</td>
                <td>{new Date(blog.createdAt).toLocaleString()}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/admin/edit/${blog.id}`)}>
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(blog.id)}>
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

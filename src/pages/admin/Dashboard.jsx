import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';


const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44387/api/blog')
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Blog verisi alınamadı,",err));
  }, []);

  const navigate = useNavigate();

    const handleLogout = () => {
  localStorage.removeItem('admin-auth'); // Giriş yetkisini kaldır
  navigate('/admin/login');              // Login sayfasına yönlendir
};

// delete
const handleDelete = async (id) => {
    if (!window.confirm("Bu blog yazısını silmek istediğine emin misin?")) return;
  
    try {
      await axios.delete(`https://localhost:44387/api/blog/${id}`);
      setBlogs(prev => prev.filter(blog => blog.id !== id)); // frontend'de de kaldır
    } catch (err) {
      alert("Silme işlemi başarısız oldu!");
      console.error(err);
    }
  };
  

  return (
    <div className="container mt-4">

<div className="d-flex justify-content-between align-items-center mb-4">
  <h3>📊 Admin Panel - Blog Listesi</h3>
  <div>
    <Link to="/admin/comments" className="btn btn-outline-info btn-sm me-2">
      💬 Yorumlar
    </Link>
    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
      🚪 Çıkış Yap
    </button>
  </div>
</div>
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
        {blogs.length > 0 ? new Date(blogs[0].createdAt).toLocaleString() : 'Yok'}
      </h5>
    </div>
  </div>
</div>


      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Başlık</th>
            <th>Tarih</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.title || <i className="text-muted">Başlık yok</i>}</td>
              <td>{new Date(blog.createdAt).toLocaleString()}</td>
              <td>
              <button
                className="btn btn-sm btn-danger me-2"
                onClick={() => handleDelete(blog.id)}>
                🗑️ Sil
                </button>
                


                <button
                   className="btn btn-sm btn-secondary"
                    onClick={() => navigate(`/admin/edit/${blog.id}`)}>
                  ✏️ Düzenle
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

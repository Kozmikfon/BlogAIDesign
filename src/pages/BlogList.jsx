import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const tagColors = {
  "ai": "primary",
  "teknoloji": "info",
  "gelecek": "success",
  "robotik": "warning",
  "yapay zeka": "dark"
};

const BlogList = ({ showToast, darkMode }) => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [search, setSearch] = useState("");
  const [lastSeenId, setLastSeenId] = useState(null);

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(() => fetchBlogs(true), 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlogs = async (checkNew = false) => {
    try {
      const res = await axios.get('https://localhost:44387/api/blog');
      const newBlogs = res.data;
      setBlogs(newBlogs);

      if (newBlogs.length > 0) {
        const latestId = newBlogs[0].id;
        if (checkNew && lastSeenId !== null && latestId !== lastSeenId) {
          showToast("🧠 Yeni bir blog yapay zeka tarafından üretildi!");
        }
        setLastSeenId(latestId);
      }
    } catch (err) {
      console.error("Blog verileri alınamadı:", err);
    }
  };

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(likes[id] ? "Beğeni geri alındı" : "Beğenildi ❤️");
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(search.toLowerCase()) ||
    blog.tags?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container mt-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
      <h2 className={`mb-3 fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>🧠 Yapay Zeka Blogları</h2>

      {/* 🔍 Arama Kutusu */}
      <input
        type="text"
        className={`form-control mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
        placeholder="Başlığa veya etikete göre ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-muted">Hiçbir blog bulunamadı.</div>
        ) : (
          filteredBlogs.map(blog => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
              <div className={`card h-100 shadow-sm border-0 position-relative ${darkMode ? 'bg-dark text-light' : ''}`} style={{ borderRadius: '16px' }}>
                
                {/* 🆕 Rozet */}
                {blog.id === filteredBlogs[0]?.id && (
                  <span className="position-absolute top-0 start-0 m-2 fw-bold text-warning">
                    🆕
                  </span>
                )}

                {/* Görsel */}
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  {/* 🏷️ Etiketler */}
                  <div className="mb-2">
                    {blog.tags?.split(',').map((tag, i) => (
                      <span key={i} className={`badge bg-${tagColors[tag.trim().toLowerCase()] || 'secondary'} me-1`}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Başlık */}
                  <h5 className="card-title">{blog.title}</h5>

                  {/* Özet */}
                  <p className="card-text small flex-grow-1">
                    {blog.summary || blog.content.substring(0, 100)}...
                  </p>

                  {/* Link + Beğeni */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/blog/${blog.id}`} className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-primary'}`}>
                      Detaya Git
                    </Link>
                    <button
                      className="btn btn-link p-0"
                      onClick={() => toggleLike(blog.id)}
                      title="Beğen"
                    >
                      {likes[blog.id] ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
                    </button>
                  </div>
                </div>

                {/* Tarih */}
                <div className={`card-footer small ${darkMode ? 'text-secondary' : 'text-muted'}`}>
                  {new Date(blog.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;

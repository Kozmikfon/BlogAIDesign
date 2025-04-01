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

const BlogList = ({showToast}) => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [search, setSearch] = useState("");
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    fetchBlogs(); // İlk yükleme
    const interval = setInterval(() => fetchBlogs(true), 10000); // 10 sn'de bir kontrol
    return () => clearInterval(interval); // Temizle
  }, []);
  

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(search.toLowerCase()) ||
    blog.tags?.toLowerCase().includes(search.toLowerCase())
  );

  const fetchBlogs = async (checkNew = false) => {
    try {
      const res = await axios.get('https://localhost:44387/api/blog');
      const newBlogs = res.data;
      setBlogs(newBlogs);

      if (checkNew && newBlogs.length > prevCount) {
        showToast("🧠 Yeni bir blog yapay zeka tarafından üretildi!");
      }

      setPrevCount(newBlogs.length);
    } catch (err) {
      console.error("Blog verileri alınamadı:", err);
    }
  };
  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(likes[id] ? "Beğeni geri alındı" : "Beğenildi ❤️");
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Yapay Zeka Blogları</h2>

      {/* 🔍 Arama Kutusu */}
      <input
        type="text"
        className="form-control mb-4"
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
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                {blog.imageUrl && (
                  <img src={blog.imageUrl} className="card-img-top" alt={blog.title} style={{ height: '200px', objectFit: 'cover' }} />
                )}
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    {blog.tags?.split(',').map((tag, i) => (
                      <span key={i} className={`badge bg-${tagColors[tag.trim().toLowerCase()] || 'secondary'} me-1`}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  <h5 className="card-title text-primary">{blog.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {blog.summary || blog.content.substring(0, 100)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary btn-sm">
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

                <div className="card-footer text-muted small">
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

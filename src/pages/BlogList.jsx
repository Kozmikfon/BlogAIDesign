import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // ❤️ ikonlar için

const tagColors = {
  "AI": "primary",
  "teknoloji": "info",
  "gelecek": "success",
  "robotik": "warning",
  "Yapay Zeka": "dark"
};


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({}); // { blogId: true/false }

  useEffect(() => {
    axios.get('https://localhost:44387/api/blog')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Yapay Zeka Blogları</h2>
      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
            
            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '16px' }}>
    
    {/* 📷 Görsel */}
    {blog.imageUrl && (
      <img src={blog.imageUrl} className="card-img-top" alt={blog.title} style={{ height: '200px', objectFit: 'cover' }} />
    )}

    <div className="card-body d-flex flex-column">
      
      {/* 🏷️ Etiketler */}
      <div className="mb-2">
        {blog.tags?.split(',').map((tag, i) => (
          <span
            key={i}
            className={`badge bg-${tagColors[tag.trim()] || 'secondary'} me-1`}
          >
            {tag.trim()}
          </span>
        ))}
      </div>

      {/* 🧠 Başlık */}
      <h5 className="card-title text-primary">{blog.title}</h5>

      {/* 🧾 Özet */}
      <p className="card-text text-muted small flex-grow-1">
        {blog.summary || blog.content.substring(0, 100)}...
      </p>

      {/* 🔗 Detay + ❤️ */}
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary btn-sm">
          Detaya Git
        </Link>
        <button
          className="btn btn-link p-0"
          onClick={() => toggleLike(blog.id)}
          title="Beğen"
        >
          {likes[blog.id] ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart color="gray" />
          )}
        </button>
      </div>
    </div>

    <div className="card-footer text-muted small">
      {new Date(blog.createdAt).toLocaleString()}
    </div>
  </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:44387/api/blog/${id}`) // ✅ PORT'u .NET portuna göre değiştir
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) {
    return <div className="container mt-5">Yükleniyor...</div>;
  }

  return (
    <div className="container mt-5">
      {/* 📷 Görsel */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="img-fluid rounded shadow mb-4"
          style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
        />
      )}

      {/* 🧠 Başlık */}
      <h2 className="text-primary">{blog.title}</h2>

      {/* 📝 Özet */}
      {blog.summary && (
        <p className="text-muted fst-italic small mb-2">
          {blog.summary}
        </p>
      )}

      {/* 🏷️ Etiketler */}
      <div className="mb-3">
        {blog.tags?.split(',').map((tag, i) => (
          <span key={i} className="badge bg-secondary me-1">{tag.trim()}</span>
        ))}
      </div>

      <hr />

      {/* 📄 İçerik */}
      <p className="lead" style={{ whiteSpace: 'pre-line' }}>
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetail;

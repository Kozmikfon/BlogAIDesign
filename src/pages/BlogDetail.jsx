import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
  console.log("Detay sayfası için ID:", id);
  axios.get(`https://localhost:44387/api/blog/${id}`)
    .then(res => {
      console.log("Gelen veri:", res.data);
      setBlog(res.data);
    })
    .catch(err => {
      console.error("Detay yüklenemedi:", err);
    });
}, [id]);

  
  if (!blog) return <div className="container mt-5 text-danger">Yükleniyor ya da içerik bulunamadı...</div>;

  return (
    <div className="container mt-5">
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-primary">{blog.title}</h2>
      <p className="text-muted small mb-3">
        Yayın Tarihi: {new Date(blog.createdAt).toLocaleString()}
      </p>
      <hr />
      <p className="lead" style={{ whiteSpace: 'pre-line' }}>
        {blog.content}
      </p>
    </div>
  </div>
  
  );
};

export default BlogDetail;

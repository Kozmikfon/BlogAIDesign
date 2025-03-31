import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    console.log("Detay sayfası için ID:", id);
    axios.get(`https://localhost:43387/api/blog/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => {
        console.error("Detay yüklenemedi:", err);
      });
  }, [id]);
  
  if (!blog) return <div className="container mt-5 text-danger">Yükleniyor ya da içerik bulunamadı...</div>;

  return (
    <div className="container mt-5">
      <h2>{blog.title}</h2>
      <p className="text-muted">{new Date(blog.createdAt).toLocaleString()}</p>
      <hr />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;

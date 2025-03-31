import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:44387/api/blog/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <p>Yükleniyor...</p>;

  return (
    <div className="container mt-4">
      <h2>{blog.title}</h2>
      <p className="text-muted">{new Date(blog.createdAt).toLocaleString()}</p>
      <hr />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;

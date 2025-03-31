import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44387/api/blog') // ⚠️ PORT'u .NET projenin portuna göre değiştir
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Yapay Zeka Blogları</h2>
      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">
                  {blog.content.substring(0, 100)}...
                </p>
                <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary btn-sm">
                  Detaya Git
                </Link>
              </div>
              <div className="card-footer text-muted">
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

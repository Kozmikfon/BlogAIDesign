import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44387/api/blog') // PORT'U .NET portuna göre ayarla
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Yapay Zeka Blogları</h2>
      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <div className="card">
              <div className="card-body">
                <h5>{blog.title}</h5>
                <p>{blog.content.substring(0, 100)}...</p>
                <Link to={`/blog/${blog.id}`} className="btn btn-primary">Detaya Git</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

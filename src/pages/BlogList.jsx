import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const tagColors = {
  ai: "primary",
  teknoloji: "info",
  gelecek: "success",
  robotik: "warning",
  "yapay zeka": "dark",
};

const BlogList = ({ showToast, darkMode }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [lastSeenId, setLastSeenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(() => fetchBlogs(true), 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlogs = async (checkNew = false) => {
    try {
      if (!checkNew) setLoading(true);
      const res = await axios.get("https://localhost:44387/api/Blog");
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
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container mt-4 ${darkMode ? "text-light" : "text-dark"}`}>
      <h2 className={`mb-3 fw-bold ${darkMode ? "text-light" : "text-dark"}`}>
        🧠 Yapay Zeka Blogları
      </h2>

      {/* 🔍 Arama Kutusu */}
      <input
        type="text"
        style={{
          margin: "0 0 20px 0",
          backgroundColor: darkMode ? "#212529" : "#fff",
          color: darkMode ? "#fff" : "#000",
          border: "1px solid #6c757d",
          padding: "10px",
          borderRadius: "6px",
          width: "100%",
        }}
        placeholder="Başlığa veya etikete göre ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-muted">Hiçbir blog bulunamadı.</div>
        ) : (
          filteredBlogs.map((blog) => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
              <div
                className={`card h-100 shadow-sm border-0 position-relative ${
                  darkMode ? "bg-dark text-light" : ""
                }`}
                style={{ borderRadius: "16px" }}
              >
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
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  {/* 🏷️ Etiketler */}
                  <div className="mb-2">
                    {blog.tags?.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className={`badge bg-${
                          tagColors[tag.trim().toLowerCase()] || "secondary"
                        } me-1`}
                      >
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

                  {/* Link */}
                  <div className="d-flex justify-content-start align-items-center">
                    <Link
                      to={`/blog/${blog.id}`}
                      className={`btn btn-sm ${
                        darkMode ? "btn-outline-light" : "btn-outline-primary"
                      }`}
                    >
                      Detaya Git
                    </Link>
                  </div>
                </div>

                {/* Tarih */}
                <div
                  className={`card-footer small ${
                    darkMode ? "text-secondary" : "text-muted"
                  }`}
                >
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
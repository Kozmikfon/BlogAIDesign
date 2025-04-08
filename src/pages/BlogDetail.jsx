import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaWhatsapp, FaTwitter, FaLink } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://localhost:44387/api/blog/${id}`);
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Detay yüklenemedi:", err);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://localhost:44387/api/comment/byblog/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const comment = {
        text: newComment,
        blogId: parseInt(id),
      };
      await axios.post("https://localhost:44387/api/comment", comment);
      setNewComment("");
      fetchComments(); // yenile
    } catch (err) {
      console.error("Yorum eklenemedi:", err);
    }
  };

  const formatUnsplashUrl = (url) => {
    if (!url.includes('?')) {
      return `${url}?w=800&h=400&fit=crop`;
    }
    return url;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Link kopyalandı!");
  };

  if (loading) return <div className="text-center mt-5">Yükleniyor...</div>;
  if (!blog) return <div className="text-center mt-5 text-danger">Blog bulunamadı.</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-sm btn-outline-secondary mb-3">← Geri</Link>

      <h2 className="mb-3">{blog.title}</h2>

      {blog.imageUrl && (
        <img
          src={formatUnsplashUrl(blog.imageUrl)}
          className="card-img-top mb-3"
          alt={blog.title}
          style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}

      <div className="mb-2 text-muted small">{blog.tags}</div>
      <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>

      {/* 📤 Paylaşım Butonları */}
      <div className="mt-4">
        <h6>📤 Paylaş:</h6>
        <div className="d-flex gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' - ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success btn-sm"
          >
            <FaWhatsapp />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-sm text-white"
          >
            <FaTwitter />
          </a>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleCopyLink}
          >
            <FaLink /> Kopyala
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {/* 💬 Yorumlar */}
      <div className="comments-section mt-4">
        <h5 className="mb-3">💬 Yorumlar</h5>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Yorumunuzu yazın..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddComment}>Gönder</button>

        {comments.length === 0 ? (
          <div className="text-muted mt-3">Henüz yorum yok.</div>
        ) : (
          <ul className="list-group mt-3">
            {comments.map((comment, i) => (
              <li key={i} className="list-group-item">
                <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small><br />
                {comment.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;

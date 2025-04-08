import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaWhatsapp, FaTwitter, FaLink } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const wordsPerMinute = 200;
  const wordCount = blog?.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  useEffect(() => {
    axios.get(`https://localhost:44387/api/blog/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Detay yüklenemedi:", err);
        setLoading(false);
      });

    axios.get(`https://localhost:44387/api/comment/byblog/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error("Yorumlar çekilemedi:", err));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const progressBar = document.getElementById("reading-progress");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      await axios.post('https://localhost:44387/api/comment', {
        blogId: blog.id,
        text: newComment
      });

      setNewComment("");
      const res = await axios.get(`https://localhost:44387/api/comment/byblog/${blog.id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Yorum eklenemedi:", err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Link kopyalandı!");
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Yükleniyor...</span>
      </Spinner>
    </div>
  );

  if (!blog) return <div className="text-center mt-5 text-danger">Blog bulunamadı.</div>;

  return (
    <>
      {/* 📈 Okuma Çubuğu */}
      <div
  id="reading-progress"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    height: "5px",
    backgroundColor: "#ff9800", // 🍊 turuncu ton
    width: "0%",                // JS ile scroll oldukça değişiyor
    zIndex: 9999,
    transition: "width 0.2s ease-out"
  }}
></div>

      <div className="container mt-4">
        <Link to="/" className="btn btn-sm btn-outline-secondary mb-3">← Geri</Link>

        <h2 className="mb-3">{blog.title}</h2>

        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            className="card-img-top mb-3"
            alt={blog.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}

        <p className="text-secondary small mb-3" style={{ fontStyle: 'italic' }}>
          🕒 Yaklaşık {readingTime} dakikalık okuma
        </p>

        <div className="mb-2 text-muted">{blog.tags}</div>
        {/* 🔽 Uzun içerik ve görsel ayrım */}
        <section className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
  
        <p>{blog.content}</p>
        <hr className="my-4" />
  
  
  
</section>

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
            <button className="btn btn-secondary btn-sm" onClick={handleCopyLink}>
              <FaLink /> Kopyala
            </button>
          </div>
        </div>

        <hr />

        {/* 💬 Yorumlar */}
        <h5 className="mb-3 mt-4">💬 Yorumlar</h5>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleAddComment}>
            Gönder
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="text-muted">Henüz yorum yok.</div>
        ) : (
          <ul className="list-group">
            {comments.map((comment, i) => (
              <li key={i} className="list-group-item">
                <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small><br />
                {comment.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BlogDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentManager = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get('https://localhost:44387/api/comment');
      setComments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yorumu silmek istediğine emin misin?")) return;

    try {
      await axios.delete(`https://localhost:44387/api/comment/${id}`);
      setComments(prev => prev.filter(c => c.id !== id));
      setMessage("✅ Yorum başarıyla silindi!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      alert("⛔ Yorum silinemedi.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">💬 Yorum Yönetimi</h4>

      {message && <div className="alert alert-success">{message}</div>}

      {loading ? (
        <div className="text-muted">Yorumlar yükleniyor...</div>
      ) : comments.length === 0 ? (
        <div className="text-muted">Hiç yorum yapılmamış.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Blog ID</th>
                <th>Yorum</th>
                <th>Tarih</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, i) => (
                <tr key={comment.id}>
                  <td>{i + 1}</td>
                  <td>{comment.blogId}</td>
                  <td className="text-break">{comment.text}</td>
                  <td>{new Date(comment.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(comment.id)}
                    >
                      🗑️ Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentManager;

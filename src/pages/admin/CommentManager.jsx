import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentManager = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get('https://localhost:44387/api/comment');
      setComments(res.data);
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yorumu silmek istediğine emin misin?")) return;

    try {
      await axios.delete(`https://localhost:44387/api/comment/${id}`);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert("Yorum silinemedi.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">💬 Yorum Yönetimi</h4>
      {comments.length === 0 ? (
        <div className="text-muted">Henüz yorum yapılmamış.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Kullanıcı</th>
              <th>Blog ID</th>
              <th>Yorum</th>
              <th>Tarih</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, i) => (
              <tr key={comment.id}>
                <td>{i + 1}</td>
                <td>{comment.userName}</td>
                <td>{comment.blogId}</td>
                <td>{comment.text}</td>
                <td>{new Date(comment.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(comment.id)}>
                    🗑️ Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommentManager;

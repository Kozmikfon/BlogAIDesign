import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    tags: '',
    imageUrl: '',
    category: '',
    createdAt: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:44387/api/blog/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Blog bulunamadı!");
        console.error(err);
        navigate('/admin');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axios.put(`https://localhost:44387/api/blog/${id}`, form);
      alert("✅ Blog başarıyla güncellendi!");
      navigate('/admin');
    } catch (err) {
      setError("⛔ Güncelleme sırasında bir hata oluştu.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Yükleniyor...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '720px' }}>
      <h4 className="mb-4">✏️ Blog Düzenle</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Başlık</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Özet</label>
          <textarea name="summary" className="form-control" rows={2} value={form.summary} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">İçerik</label>
          <textarea name="content" className="form-control" rows={6} value={form.content} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Etiketler (virgülle ayır)</label>
          <input type="text" name="tags" className="form-control" value={form.tags} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Görsel URL</label>
          <input type="text" name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="form-label">Kategori</label>
          <input type="text" name="category" className="form-control" value={form.category} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success" disabled={saving}>
          {saving ? 'Kaydediliyor...' : '💾 Kaydet'}
        </button>
        <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => navigate('/admin')}>
          Vazgeç
        </button>
      </form>
    </div>
  );
};

export default AdminEdit;

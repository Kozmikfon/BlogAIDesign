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
    category: ''
  });

  useEffect(() => {
    axios.get(`https://localhost:44387/api/blog/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        alert("Blog bulunamadı!");
        navigate('/admin');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:44387/api/blog/${id}`, form);
      alert("Blog başarıyla güncellendi!");
      navigate('/admin');
    } catch (err) {
      alert("Güncelleme başarısız oldu.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h4 className="mb-3">✏️ Blog Düzenle</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Başlık</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Özet</label>
          <textarea name="summary" className="form-control" value={form.summary} onChange={handleChange} rows={2}></textarea>
        </div>
        <div className="mb-3">
          <label>İçerik</label>
          <textarea name="content" className="form-control" value={form.content} onChange={handleChange} rows={5}></textarea>
        </div>
        <div className="mb-3">
          <label>Etiketler (virgülle)</label>
          <input type="text" name="tags" className="form-control" value={form.tags} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Görsel URL</label>
          <input type="text" name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Kategori</label>
          <input type="text" name="category" className="form-control" value={form.category} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Kaydet</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin')}>İptal</button>
      </form>
    </div>
  );
};

export default AdminEdit;

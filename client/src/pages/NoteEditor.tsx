import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      axios.get(`/notes/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (id === 'new') {
      await axios.post('/notes', { title, content });
    } else {
      await axios.put(`/notes/${id}`, { title, content });
    }
    navigate('/dashboard');
  };

  const handleDelete = async () => {
    await axios.delete(`/notes/${id}`);
    navigate('/dashboard');
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleSave}>Save</button>
      {id !== 'new' && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
}
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Note } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/notes').then((res) => setNotes(res.data));
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={() => navigate('/note/new')}>+ Create Note</button>
      {notes.map((note) => (
        <div key={note._id} onClick={() => navigate(`/note/${note._id}`)}>
          <h3>{note.title}</h3>
          <p>{note.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

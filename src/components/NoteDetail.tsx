import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch note
    supabase.from('notes').select('*').eq('id', id).single().then(({ data }) => setNote(data));
    // Fetch comments (assuming you have a comments table)
    supabase.from('comments').select('*').eq('note_id', id).then(({ data }) => setComments(data || []));
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('comments').insert([{ note_id: id, content: comment }]).select();
    if (!error && data) {
      setComments([...comments, ...data]);
      setComment('');
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
      <p className="mb-4">{note.content}</p>
      <hr className="my-4" />
      <h3 className="font-semibold mb-2">Comments</h3>
      <ul className="mb-4">
        {comments.map((c) => (
          <li key={c.id} className="mb-2 border-b pb-2">{c.content}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Post</button>
      </form>
    </div>
  );
}
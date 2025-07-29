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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
      <div className="relative max-w-xl w-full mx-auto mt-8 p-6 bg-white/90 rounded-2xl shadow-xl border border-yellow-200 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 opacity-20 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 opacity-20 rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-purple-900">{note.title}</h2>
          <p className="mb-4 text-gray-800">{note.content}</p>
          <hr className="my-4" />
          <h3 className="font-semibold mb-2 text-purple-700">Comments</h3>
          <ul className="mb-4">
            {comments.map((c) => (
              <li key={c.id} className="mb-2 border-b pb-2 text-gray-700">{c.content}</li>
            ))}
          </ul>
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              className="flex-1 border border-purple-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-200"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded shadow hover:from-blue-700 hover:to-indigo-700 transition" type="submit">
              Post
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
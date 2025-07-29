import { useState } from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { Note } from '../hooks/useNotes';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Confirm before deleting
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
      setShowMenu(false);
    }
  };

  // Handle card click to navigate to note detail
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on menu buttons
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/notes/${note.id}`);
  };

  return (
    <div
      className={clsx(
        "bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100",
        "rounded-xl shadow-md border border-yellow-200 p-6",
        "hover:shadow-lg transition-shadow group cursor-pointer",
        "relative overflow-hidden"
      )}
      onClick={handleCardClick}
    >
      {/* Decorative background shapes */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-200 opacity-30 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-pink-200 opacity-20 rounded-full pointer-events-none"></div>
      {/* Main content */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {note.title}
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  onEdit(note);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-4 relative z-10">
        {truncateContent(note.content)}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-600 relative z-10">
        <span>Updated {formatDate(note.updated_at)}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Read more
        </button>
      </div>
    </div>
  );}

 // export default NoteCard;
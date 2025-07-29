import { useState, useEffect } from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { Note } from '../hooks/useNotes';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  isNew?: boolean;
}

export function NoteCard({ note, onEdit, onDelete, isNew = false }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [highlight, setHighlight] = useState(isNew);
  const navigate = useNavigate();

  useEffect(() => {
    if (highlight) {
      const timer = setTimeout(() => setHighlight(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

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

  const truncateContent = (content: string, maxLength = 150) => {
    return content.length <= maxLength ? content : content.slice(0, maxLength) + '...';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setDeleting(true);
      try {
        await onDelete(note.id);
      } finally {
        setDeleting(false);
        setShowMenu(false);
      }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('.note-dropdown') ||
      target.closest('.note-menu')
    )
      return;

    navigate(`/notes/${note.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={handleCardClick}
      className={clsx(
        'relative group cursor-pointer overflow-hidden rounded-xl border p-6 shadow-md transition-shadow hover:shadow-xl',
        'bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100',
        highlight && 'ring-2 ring-blue-400'
      )}
    >
      {/* Decorative Circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-200 opacity-30 rounded-full pointer-events-none z-0" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-pink-200 opacity-20 rounded-full pointer-events-none z-0" />

      {/* Dropdown menu */}
      <div className="absolute top-4 right-4 z-[9999] note-menu">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle menu"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {showMenu && (
          <div
            className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl py-2 z-[99999] min-w-[140px] note-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                onEdit(note);
                setShowMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full text-blue-700 bg-blue-50 hover:bg-blue-100 font-medium text-sm rounded transition"
            >
              <Edit className="w-4 h-4 text-blue-600" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 w-full font-medium text-sm rounded transition',
                deleting
                  ? 'text-red-300 bg-red-50 cursor-not-allowed'
                  : 'text-red-700 bg-red-50 hover:bg-red-100'
              )}
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 relative z-10">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4 relative z-10">
        {truncateContent(note.content)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600 relative z-10">
        <span>Updated {formatDate(note.updated_at)}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/notes/${note.id}`);
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 text-xs font-semibold rounded shadow transition-colors"
        >
          Read more
        </button>
      </div>
    </motion.div>
  );
}

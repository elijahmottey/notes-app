import { useState } from 'react';
import { Header } from '../components/Header';
import { NotesGrid } from '../components/NotesGrid';
import { NoteEditor } from '../components/NoteEditor';
import { useNotes, Note } from '../hooks/useNotes';

export function Dashboard() {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (title: string, content: string) => {
    if (editingNote) {
      await updateNote(editingNote.id, title, content);
    } else {
      await createNote(title, content);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingNote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateNote={handleCreateNote} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotesGrid
          notes={notes}
          loading={loading}
          onEditNote={handleEditNote}
          onDeleteNote={deleteNote}
        />
      </main>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Trash2, Tag, Edit2, Check, X } from 'lucide-react';

const NotesList = ({ notes, onDeleteNote, onEditNote }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      onEditNote(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  if (notes.length === 0) {
    return (
      <div className="card max-w-4xl mx-auto text-center py-12 animate-fade-in">
        <p className="text-stone-400 font-light text-lg">
          No notes yet. Start by adding your thoughts above.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-3 animate-fade-in">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="card hover:shadow-lg transition-all duration-300 group border-l-4 border-sage-500 hover:border-sage-700 hover:-translate-y-1"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {editingId === note.id ? (
            // EDIT MODE
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-sage-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none text-stone-700"
                rows={3}
                autoFocus
                placeholder="Edit your note..."
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={!editText.trim()}
                  className="px-4 py-2 text-sm font-medium bg-sage-700 text-white hover:bg-sage-800 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Check size={16} />
                  Save
                </button>
              </div>
              <p className="text-xs text-stone-500 text-right">
                Press <kbd className="px-2 py-1 bg-stone-200 rounded text-xs">⌘</kbd> + <kbd className="px-2 py-1 bg-stone-200 rounded text-xs">Enter</kbd> to save, <kbd className="px-2 py-1 bg-stone-200 rounded text-xs">Esc</kbd> to cancel
              </p>
            </div>
          ) : (
            // VIEW MODE
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-stone-700 leading-relaxed font-light">
                  {note.text}
                </p>
                {note.theme && (
                  <div className="mt-3 flex items-center gap-2">
                    <Tag size={14} className="text-sage-600" />
                    <span className="text-sm font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-full border border-sage-200 hover:bg-sage-100 transition-colors duration-200">
                      {note.theme}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => startEditing(note)}
                  className="p-2 hover:bg-sage-50 rounded-lg text-stone-400 hover:text-sage-700 hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Edit note"
                  title="Edit note"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-stone-400 hover:text-red-600 hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Delete note"
                  title="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesList;

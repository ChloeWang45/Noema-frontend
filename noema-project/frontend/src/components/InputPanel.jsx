import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

const InputPanel = ({ onAddNote, onGenerateInsights, isLoading, notesCount }) => {
  const [noteText, setNoteText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAddNote(noteText.trim());
      setNoteText('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="card max-w-4xl mx-auto animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Enter a thought, idea, or note..."
              className={`input-field resize-none font-light transition-all duration-300 ${
                isExpanded ? 'h-32 shadow-md' : 'h-14'
              } ${noteText ? 'border-sage-400' : ''}`}
              rows={isExpanded ? 4 : 1}
            />
            {isExpanded && noteText && (
              <div className="absolute bottom-3 right-3 text-xs text-stone-400 font-mono">
                {noteText.length} chars
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-stone-600">
              {notesCount} {notesCount === 1 ? 'note' : 'notes'}
            </div>
            {notesCount >= 3 && (
              <div className="text-xs text-sage-600 bg-sage-50 px-2 py-1 rounded-full animate-fade-in">
                Ready to analyze ✨
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!noteText.trim() || isLoading}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              <Plus size={18} />
              Add Note
            </button>
            
            {notesCount >= 3 && (
              <button
                type="button"
                onClick={onGenerateInsights}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-pulse-gentle">
                      <Sparkles size={18} />
                    </div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Insights
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputPanel;

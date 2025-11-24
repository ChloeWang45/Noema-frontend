import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ReactFlowProvider } from 'reactflow';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import NotesList from './components/NotesList';
import MindMap from './components/MindMap';
import InsightsPanel from './components/InsightsPanel';
import ViewToggle from './components/ViewToggle';

function App() {
  const [notes, setNotes] = useState([]);
  const [themes, setThemes] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [error, setError] = useState(null);
  const mindMapRef = useRef(null);

  const handleReplayAnimation = () => {
    if (mindMapRef.current) {
      mindMapRef.current.replayAnimation();
    }
  };

  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      theme: null,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setError(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    // Reset insights when notes change significantly
    if (insights.length > 0) {
      setInsights([]);
      setThemes([]);
    }
  };

  const editNote = (id, newText) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, text: newText } : note
    ));
    // Reset insights when notes are edited
    if (insights.length > 0) {
      setInsights([]);
      setThemes([]);
    }
  };

  const generateInsights = async () => {
    if (notes.length < 3) {
      setError('Please add at least 3 notes to generate insights.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const API_BASE =
        import.meta.env.MODE === "development"
          ? "http://localhost:3000"
          : "https://noema-7j894znid-chloewang45s-projects.vercel.app";

      const response = await axios.post(`${API_BASE}/api/analyze`, {
        notes: notes.map(note => note.text),
      });



      const { themes: analyzedThemes, insights: generatedInsights } = response.data;

      // Update notes with their assigned themes
      const updatedNotes = [...notes];
      analyzedThemes.forEach(theme => {
        theme.notes.forEach(noteText => {
          const note = updatedNotes.find(n => n.text === noteText.text);
          if (note) {
            note.theme = theme.name;
          }
        });
      });

      setNotes(updatedNotes);
      setThemes(analyzedThemes);
      setInsights(generatedInsights);
      setCurrentView('map');
    } catch (err) {
      console.error('Error generating insights:', err);
      setError(
        err.response?.data?.error || 
        'Failed to generate insights. Please check your API key and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notes and insights?')) {
      setNotes([]);
      setThemes([]);
      setInsights([]);
      setError(null);
      setCurrentView('list');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Input Section */}
          <div className="flex-shrink-0 p-6 space-y-6">
            <InputPanel
              onAddNote={addNote}
              onGenerateInsights={generateInsights}
              isLoading={isLoading}
              notesCount={notes.length}
            />

            {error && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              </div>
            )}

            {notes.length > 0 && (
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <ViewToggle 
                  currentView={currentView} 
                  onViewChange={setCurrentView}
                  onReplayAnimation={handleReplayAnimation}
                  showReplay={themes.length > 0}
                />
                
                {notes.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-stone-500 hover:text-red-600 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-smooth">
            {currentView === 'list' ? (
              <div className="space-y-6">
                {insights.length > 0 && (
                  <InsightsPanel insights={insights} themes={themes} />
                )}
                <NotesList notes={notes} onDeleteNote={deleteNote} onEditNote={editNote} />
              </div>
            ) : (
              <div className="w-full" style={{ height: '700px', minHeight: '700px' }}>
                <ReactFlowProvider>
                  <MindMap ref={mindMapRef} themes={themes} notes={notes} insights={insights} />
                </ReactFlowProvider>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

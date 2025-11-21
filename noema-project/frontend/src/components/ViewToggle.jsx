import React from 'react';
import { List, Network, Play } from 'lucide-react';

const ViewToggle = ({ currentView, onViewChange, onReplayAnimation, showReplay }) => {
  return (
    <div className="flex gap-2 glass-panel p-1 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-sage-700 text-white shadow-md scale-105'
            : 'text-stone-600 hover:bg-stone-100 hover:scale-105'
        }`}
      >
        <List size={18} />
        <span className="font-medium">Notes</span>
      </button>
      
      <button
        onClick={() => onViewChange('map')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === 'map'
            ? 'bg-sage-700 text-white shadow-md scale-105'
            : 'text-stone-600 hover:bg-stone-100 hover:scale-105'
        }`}
      >
        <Network size={18} />
        <span className="font-medium">Mind Map</span>
      </button>

      {/* Replay Animation Button - Only show when mind map exists */}
      {showReplay && currentView === 'map' && (
        <button
          onClick={onReplayAnimation}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-amber-600 hover:bg-amber-50 hover:scale-105 border-2 border-amber-400 hover:border-amber-500 animate-pulse-gentle"
          title="Replay animation"
        >
          <Play size={18} className="fill-amber-600" />
          <span className="font-medium">Replay</span>
        </button>
      )}
    </div>
  );
};

export default ViewToggle;

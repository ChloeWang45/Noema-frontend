import React from 'react';
import { Brain, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-panel border-b border-stone-200 backdrop-blur-md bg-white/90 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sage-300 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 transform transition-transform">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-semibold text-stone-800 tracking-tight">
              Noēma
            </h1>
            <p className="text-sm text-stone-500 font-light">
              Discover connections in your thoughts
            </p>
          </div>
        </div>
        
        <a
          href="https://github.com/ChloeWang45/Noema-by-The-Mind-Readers.git"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-stone-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="View on GitHub"
        >
          <Github size={20} className="text-stone-600" />
        </a>
      </div>
    </header>
  );
};

export default Header;

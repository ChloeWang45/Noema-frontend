import React, { useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Sparkles, Lightbulb, Zap, Brain, Stars, X, Maximize2 } from 'lucide-react';

// Modal
const NoteModal = ({ note, onClose, isAI }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={onClose}>
    <div 
      className={`relative max-w-2xl w-full rounded-2xl shadow-2xl border-2 p-8 ${
        isAI ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-300' 
             : 'bg-gradient-to-br from-white via-stone-50 to-white border-stone-300'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-stone-200 hover:bg-stone-300">
        <X size={20} />
      </button>
      <div className="flex items-center gap-2 mb-4">
        {isAI ? (
          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-xs font-black rounded-full flex items-center gap-1">
            <Sparkles size={12} /> AI NOTE
          </div>
        ) : (
          <div className="px-3 py-1 bg-gradient-to-r from-stone-600 to-stone-700 text-white text-xs font-bold rounded-full">
            YOUR NOTE
          </div>
        )}
      </div>
      <div className="text-base leading-relaxed text-stone-800">{note}</div>
    </div>
  </div>
);

// Theme Node
const CustomThemeNode = ({ data }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-sage-400 via-sage-500 to-sage-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
    <div className="relative px-8 py-6 rounded-2xl shadow-2xl border-2 bg-sage-700 border-sage-600 text-white w-auto hover:scale-110 transition-all duration-500 backdrop-blur-sm" style={{ minWidth: '280px', maxWidth: '400px' }}>

      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg">
          <Stars size={14} className="text-amber-900" />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">Theme</div>
      </div>
      <div className="text-xl font-black leading-tight mb-3 drop-shadow-lg break-words">{data.label}</div>
      {data.insight && (
        <div className="mt-4 pt-4 border-t border-sage-600/50">
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-amber-300 drop-shadow-lg" />
            <div className="text-[11px] opacity-95 italic leading-relaxed text-sage-100 break-words">{data.insight}</div>
          </div>
        </div>
      )}
      <div className="absolute -top-2 -right-2 px-3 py-1.5 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-full text-xs font-black shadow-xl border-2 border-amber-300">
        {data.noteCount || 0}
      </div>
    </div>
  </div>
);

// User Note Node
const CustomNoteNode = ({ data }) => {
  const fullText = data.fullText || data.label;
  const shouldTruncate = fullText.length > 160;
  const displayText = shouldTruncate ? fullText.substring(0, 160) + '...' : fullText;
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-stone-300 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
      <div 
        className="relative px-5 py-4 rounded-xl shadow-xl border-2 bg-gradient-to-br from-white via-stone-50 to-white border-stone-300 text-stone-900 hover:shadow-2xl hover:border-sage-400 hover:-translate-y-2 transition-all cursor-pointer" 
        style={{ minWidth: '240px', maxWidth: shouldTruncate ? '400px' : '450px' }}
        onClick={() => data.onExpand && data.onExpand(fullText, false)}
      >
        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-gradient-to-r from-stone-600 to-stone-700 text-white text-[9px] font-bold rounded-full shadow-lg">YOU</div>
        <div className="text-sm font-normal leading-relaxed text-stone-800 break-words whitespace-normal">{displayText}</div>
        <div className="absolute bottom-2 right-2 p-1 bg-stone-200 rounded-full opacity-60 group-hover:opacity-100">
          <Maximize2 size={12} className="text-stone-600" />
        </div>
      </div>
    </div>
  );
};

// AI Note Node
const CustomAINoteNode = ({ data }) => {
  const fullText = data.fullText || data.label;
  const shouldTruncate = fullText.length > 200;
  const displayText = shouldTruncate ? fullText.substring(0, 200) + '...' : fullText;
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
      <div 
        className="relative px-5 py-4 rounded-xl shadow-xl border-2 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-300 text-purple-900 hover:shadow-2xl hover:border-purple-500 hover:-translate-y-2 transition-all cursor-pointer" 
        style={{ minWidth: '260px', maxWidth: shouldTruncate ? '480px' : '520px' }}
        onClick={() => data.onExpand && data.onExpand(fullText, true)}
      >
        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-[9px] font-black rounded-full shadow-lg flex items-center gap-1">
          <Sparkles size={10} /> AI
        </div>
        <div className="text-sm font-medium leading-relaxed break-words whitespace-normal">{displayText}</div>
        <div className="absolute bottom-2 right-2 p-1 bg-purple-200 rounded-full opacity-60 group-hover:opacity-100">
          <Maximize2 size={12} className="text-purple-600" />
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  themeNode: CustomThemeNode,
  noteNode: CustomNoteNode,
  aiNoteNode: CustomAINoteNode,
};

const MindMap = React.forwardRef(({ themes, notes, insights }, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [modalNote, setModalNote] = useState(null);
  const [isModalAI, setIsModalAI] = useState(false);

  React.useImperativeHandle(ref, () => ({
    replayAnimation: () => setAnimationKey(prev => prev + 1)
  }));

  const handleExpandNote = (fullText, isAI) => {
    setModalNote(fullText);
    setIsModalAI(isAI);
  };

  useEffect(() => {
    if (!themes || themes.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    setIsAnimating(true);
    
    const centerX = 800;
    const centerY = 500;
    const themeRadius = 500;
    const angleStep = (2 * Math.PI) / themes.length;

    const allNodes = [];
    const allEdges = [];

    themes.forEach((theme, themeIndex) => {
      const angle = themeIndex * angleStep - Math.PI / 2;
      const themeX = centerX + themeRadius * Math.cos(angle);
      const themeY = centerY + themeRadius * Math.sin(angle);
      const themeId = `theme-${themeIndex}`;

      // Theme node
      allNodes.push({
        id: themeId,
        type: 'themeNode',
        position: { x: themeX - 140, y: themeY - 80 },
        data: { 
          label: theme.name,
          insight: theme.insight,
          noteCount: theme.notes?.length || 0,
        },
        style: { opacity: 0 },
      });

      // Notes arranged BESIDE theme (not overlapping)
      if (theme.notes && theme.notes.length > 0) {
        const notesPerRow = 3;
        const noteSpacing = 300;
        const rowSpacing = 150;
        
        theme.notes.forEach((note, noteIndex) => {
          const row = Math.floor(noteIndex / notesPerRow);
          const col = noteIndex % notesPerRow;
          
          // Calculate position beside the theme
          const offsetAngle = angle + Math.PI / 2;
          const baseOffsetX = 400 * Math.cos(offsetAngle);
          const baseOffsetY = 400 * Math.sin(offsetAngle);
          
          const noteX = themeX + baseOffsetX + (col - 1) * noteSpacing;
          const noteY = themeY + baseOffsetY + row * rowSpacing;
          
          const noteId = `note-${themeIndex}-${noteIndex}`;
          const isAI = note.aiGenerated === true;
          const noteText = note.text || note;
          
          allNodes.push({
            id: noteId,
            type: isAI ? 'aiNoteNode' : 'noteNode',
            position: { x: noteX - 120, y: noteY - 60 },
            data: { 
              label: noteText.length > (isAI ? 200 : 160) ? noteText.substring(0, isAI ? 200 : 160) + '...' : noteText,
              fullText: noteText,
              onExpand: handleExpandNote,
            },
            style: { opacity: 0 },
          });

          // CREATE VISIBLE EDGE
          allEdges.push({
            id: `edge-${themeId}-${noteId}`,
            source: themeId,
            target: noteId,
            type: 'smoothstep',
            animated: isAI,
            style: {
              stroke: isAI ? '#a855f7' : '#5f6b5f',
              strokeWidth: isAI ? 4 : 3,
              filter: isAI ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' : 'drop-shadow(0 0 6px rgba(95, 107, 95, 0.6))',
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isAI ? '#a855f7' : '#5f6b5f',
              width: 20,
              height: 20,
            },
          });
        });
      }
    });

    // Insight edges
    if (insights && insights.length > 0) {
      insights.forEach((insight, insightIndex) => {
        if (insight.connectedThemes && insight.connectedThemes.length >= 2) {
          const theme1Index = themes.findIndex(t => t.name === insight.connectedThemes[0]);
          const theme2Index = themes.findIndex(t => t.name === insight.connectedThemes[1]);
          
          if (theme1Index !== -1 && theme2Index !== -1) {
            allEdges.push({
              id: `insight-${insightIndex}`,
              source: `theme-${theme1Index}`,
              target: `theme-${theme2Index}`,
              type: 'straight',
              animated: true,
              style: {
                stroke: '#fbbf24',
                strokeWidth: 5,
                strokeDasharray: '10 5',
                filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.9))',
              },
              label: '✨',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#fbbf24',
                width: 28,
                height: 28,
              },
            });
          }
        }
      });
    }

    setNodes(allNodes);
    setEdges(allEdges);

    // Fade in
    setTimeout(() => {
      setNodes(n => n.map(node => ({ ...node, style: { opacity: 1, transition: 'opacity 800ms ease-in-out' } })));
    }, 100);

    // Explosion
    setTimeout(() => {
      setNodes(n => n.map(node => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 500 + Math.random() * 600;
        return {
          ...node,
          position: {
            x: centerX + distance * Math.cos(angle) - 140,
            y: centerY + distance * Math.sin(angle) - 60,
          },
          style: { opacity: 1, transition: 'all 2200ms cubic-bezier(0.34, 1.56, 0.64, 1)' },
        };
      }));
    }, 300);

    // Settle to final positions
    setTimeout(() => {
      setNodes(n => n.map((node, i) => {
        const originalNode = allNodes[i];
        return {
          ...node,
          position: originalNode.position,
          style: { opacity: 1, transition: 'all 3500ms cubic-bezier(0.16, 1, 0.3, 1)' },
        };
      }));
    }, 2600);

    // Complete
    setTimeout(() => {
      setIsAnimating(false);
      setNodes(n => n.map(node => ({ ...node, style: { opacity: 1 } })));
    }, 6200);

  }, [themes, notes, insights, animationKey]);

  if (!themes || themes.length === 0) {
    return (
      <div className="h-full min-h-[700px] flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-sage-900 rounded-2xl relative overflow-hidden">
        <div className="text-center space-y-6 p-8 relative z-10">
          <Brain size={64} className="mx-auto text-sage-300 drop-shadow-2xl" />
          <p className="text-stone-200 font-light text-xl">Your thoughts await visualization</p>
          <p className="text-stone-400 text-sm">Add 3+ notes and generate insights to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-300 bg-gradient-to-br from-stone-50 via-white to-stone-100 relative">
      {modalNote && <NoteModal note={modalNote} onClose={() => setModalNote(null)} isAI={isModalAI} />}
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 z-50 pointer-events-none backdrop-blur-[1px]"></div>
      )}
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.4,
          maxZoom: 1.2,
        }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#d6d3d1" gap={24} size={1.5} variant="dots" />
        <Controls className="!bg-white/95 !shadow-2xl !border-2 !border-stone-300 !rounded-xl" />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'themeNode') return '#5f6b5f';
            if (node.type === 'aiNoteNode') return '#a855f7';
            return '#ffffff';
          }}
          className="!bg-white/95 !shadow-2xl !border-2 !border-stone-300 !rounded-xl"
        />

        <Panel position="top-left" className="!bg-white/95 !px-5 !py-3 !shadow-2xl !border-2 !border-stone-300 !rounded-xl">
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage-700 shadow-lg"></div>
              <span>Themes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-stone-400 shadow-lg"></div>
              <span>Your Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg"></div>
              <span className="text-purple-700">AI Notes</span>
            </div>
          </div>
        </Panel>

        <Panel position="top-right" className="!bg-white/95 !px-5 !py-3 !shadow-2xl !border-2 !border-stone-300 !rounded-xl">
          <div className="flex items-center gap-3 text-sm font-black">
            <Stars size={16} className="text-sage-600" />
            <span>{themes.length} {themes.length === 1 ? 'Theme' : 'Themes'}</span>
            <div className="w-px h-4 bg-stone-300"></div>
            <Sparkles size={16} className="text-purple-500" />
            <span>
              {themes.reduce((sum, theme) => sum + (theme.notes?.filter(n => n.aiGenerated).length || 0), 0)} AI Notes
            </span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
});

MindMap.displayName = 'MindMap';
export default MindMap;

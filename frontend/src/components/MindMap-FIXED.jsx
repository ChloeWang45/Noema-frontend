import React, { useCallback, useMemo, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network, Sparkles, Lightbulb, Zap, Brain, Stars, X, Maximize2 } from 'lucide-react';

// Modal for viewing full note content
const NoteModal = ({ note, onClose, isAI }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div 
        className={`relative max-w-2xl w-full rounded-2xl shadow-2xl border-2 p-8 animate-scaleIn ${
          isAI 
            ? 'bg-gradient-to-br from-sage-50 via-pink-50 to-blue-50 border-sage-300' 
            : 'bg-gradient-to-br from-white via-stone-50 to-white border-stone-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-2 mb-4">
          {isAI ? (
            <div className="px-3 py-1 bg-gradient-to-r from-sage-600 via-pink-600 to-blue-600 text-white text-xs font-black rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              AI NOTE
            </div>
          ) : (
            <div className="px-3 py-1 bg-gradient-to-r from-stone-600 to-stone-700 text-white text-xs font-bold rounded-full">
              YOUR NOTE
            </div>
          )}
        </div>
        
        <div className="text-base leading-relaxed text-stone-800">
          {note}
        </div>
      </div>
    </div>
  );
};

// Theme Node
const CustomThemeNode = ({ data }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-sage-400 via-sage-500 to-sage-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-gentle"></div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sage-300 via-transparent to-sage-300 opacity-40"></div>
      
      <div className="relative px-8 py-6 rounded-2xl shadow-2xl border-2 bg-gradient-to-br from-sage-800 via-sage-900 to-stone-900 border-sage-500 text-white w-auto hover:scale-110 transition-all duration-500 backdrop-blur-sm" style={{ minWidth: '280px', maxWidth: '400px' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg">
            <Stars size={14} className="text-amber-900" />
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
            Theme
          </div>
        </div>
        
        <div className="text-xl font-black leading-tight mb-3 drop-shadow-lg break-words">
          {data.label}
        </div>
        
        {data.insight && (
          <div className="mt-4 pt-4 border-t border-sage-600/50">
            <div className="flex items-start gap-2">
              <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-amber-300 drop-shadow-lg animate-pulse-gentle" />
              <div className="text-[11px] opacity-95 italic leading-relaxed text-sage-100 break-words">
                {data.insight}
              </div>
            </div>
          </div>
        )}
        
        <div className="absolute -top-2 -right-2 px-3 py-1.5 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-xs font-black shadow-xl border-2 border-amber-300">
          {data.noteCount || 0}
        </div>
        
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/50 rounded-tl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/50 rounded-br-2xl"></div>
      </div>
    </div>
  );
};

// User Note Node
const CustomNoteNode = ({ data }) => {
  const fullText = data.fullText || data.label;
  const shouldTruncate = fullText.length > 160;
  const displayText = shouldTruncate ? fullText.substring(0, 160) + '...' : fullText;
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-stone-300 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      <div 
        className="relative px-5 py-4 rounded-xl shadow-xl border-2 bg-gradient-to-br from-white via-stone-50 to-white border-stone-300 text-stone-900 w-auto hover:shadow-2xl hover:border-sage-400 hover:-translate-y-2 hover:scale-105 transition-all duration-400 backdrop-blur-sm cursor-pointer" 
        style={{ minWidth: '240px', maxWidth: shouldTruncate ? '400px' : '450px' }}
        onClick={() => data.onExpand && data.onExpand(fullText, false)}
      >
        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-gradient-to-r from-stone-600 to-stone-700 text-white text-[9px] font-bold rounded-full shadow-lg">
          YOU
        </div>
        
        <div className="text-sm font-normal leading-relaxed text-stone-800 break-words whitespace-normal">
          {displayText}
        </div>
        
        <div className="absolute bottom-2 right-2 p-1 bg-stone-200 rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={12} className="text-stone-600" />
        </div>
        
        <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-stone-400 to-stone-500 rounded-full opacity-60"></div>
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
      <div className="absolute inset-0 bg-gradient-to-r from-sage-400 via-pink-400 to-blue-400 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-gentle"></div>
      
      <div 
        className="relative px-5 py-4 rounded-xl shadow-xl border-2 bg-gradient-to-br from-sage-50 via-pink-50 to-blue-50 border-sage-300 text-sage-900 w-auto hover:shadow-2xl hover:border-sage-500 hover:-translate-y-2 hover:scale-105 transition-all duration-400 backdrop-blur-sm cursor-pointer" 
        style={{ minWidth: '260px', maxWidth: shouldTruncate ? '480px' : '520px' }}
        onClick={() => data.onExpand && data.onExpand(fullText, true)}
      >
        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-gradient-to-r from-sage-600 via-pink-600 to-blue-600 text-white text-[9px] font-black rounded-full shadow-lg flex items-center gap-1 animate-pulse-gentle">
          <Sparkles size={10} />
          AI
        </div>
        
        <div className="text-sm font-medium leading-relaxed break-words whitespace-normal">
          {displayText}
        </div>
        
        <div className="absolute bottom-2 right-2 p-1 bg-sage-200 rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={12} className="text-sage-600" />
        </div>
        
        <div className="absolute top-2 right-2">
          <Zap size={12} className="text-sage-400 animate-pulse-gentle" />
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
  const { fitView } = useReactFlow();

  React.useImperativeHandle(ref, () => ({
    replayAnimation: () => {
      setAnimationKey(prev => prev + 1);
    }
  }));

  const handleExpandNote = (fullText, isAI) => {
    setModalNote(fullText);
    setIsModalAI(isAI);
  };

  // COMPLETELY REBUILT ANIMATION WITH GUARANTEED EDGE VISIBILITY
  useEffect(() => {
    if (!themes || themes.length === 0) return;

    console.log('🚀 Starting animation with', themes.length, 'themes');
    setIsAnimating(true);

    const centerX = 600;
    const centerY = 400;
    const initialNodes = [];
    const finalNodes = [];
    const newEdges = [];
    
    const themeRadius = 380;
    const noteRadius = 240;
    const angleStep = (2 * Math.PI) / themes.length;

    themes.forEach((theme, themeIndex) => {
      const angle = themeIndex * angleStep - Math.PI / 2;
      const finalThemeX = centerX + themeRadius * Math.cos(angle);
      const finalThemeY = centerY + themeRadius * Math.sin(angle);
      const noteCount = theme.notes ? theme.notes.length : 0;
      const themeId = `theme-${themeIndex}`;

      // Create theme node
      initialNodes.push({
        id: themeId,
        type: 'themeNode',
        position: { 
          x: centerX - 140, 
          y: centerY - 80
        },
        data: { 
          label: theme.name,
          type: 'theme',
          insight: theme.insight,
          noteCount: noteCount,
          onExpand: handleExpandNote
        },
        draggable: true,
        style: { opacity: 0 },
      });

      finalNodes.push({
        id: themeId,
        position: { x: finalThemeX - 140, y: finalThemeY - 80 },
      });

      // Create note nodes and EDGES
      if (theme.notes && theme.notes.length > 0) {
        const noteAngleSpread = Math.min(Math.PI * 0.75, theme.notes.length * 0.5);
        const startAngle = angle - noteAngleSpread / 2;
        
        theme.notes.forEach((note, noteIndex) => {
          const noteAngle = startAngle + (noteAngleSpread / (theme.notes.length - 1 || 1)) * noteIndex;
          const finalNoteX = finalThemeX + noteRadius * Math.cos(noteAngle);
          const finalNoteY = finalThemeY + noteRadius * Math.sin(noteAngle);
          
          const explosionAngle = Math.random() * 2 * Math.PI;
          const explosionDistance = 400 + Math.random() * 500;
          const explosionX = centerX + explosionDistance * Math.cos(explosionAngle);
          const explosionY = centerY + explosionDistance * Math.sin(explosionAngle);

          const noteId = `note-${themeIndex}-${noteIndex}`;
          const isAIGenerated = note.aiGenerated === true;
          const noteText = note.text || note;
          
          initialNodes.push({
            id: noteId,
            type: isAIGenerated ? 'aiNoteNode' : 'noteNode',
            position: { 
              x: centerX - 120, 
              y: centerY - 60
            },
            data: { 
              label: noteText.length > (isAIGenerated ? 200 : 160) 
                ? noteText.substring(0, isAIGenerated ? 200 : 160) + '...' 
                : noteText,
              fullText: noteText,
              type: isAIGenerated ? 'ai-note' : 'note',
              explosionTarget: { x: explosionX, y: explosionY },
              finalTarget: { x: finalNoteX - 120, y: finalNoteY - 60 },
              onExpand: handleExpandNote,
              parentTheme: themeId
            },
            draggable: true,
            style: { opacity: 0 },
          });

          finalNodes.push({
            id: noteId,
            position: { x: finalNoteX - 120, y: finalNoteY - 60 },
          });

          // CREATE EDGE - This is CRITICAL
          const edgeId = `edge-${themeId}-to-${noteId}`;
          const edgeColor = isAIGenerated ? '#a855f7' : '#5f6b5f';
          const edgeWidth = isAIGenerated ? 4 : 3;
          
          newEdges.push({
            id: edgeId,
            source: themeId,
            target: noteId,
            type: 'default', // Changed from smoothstep for guaranteed visibility
            animated: isAIGenerated,
            style: { 
              stroke: edgeColor,
              strokeWidth: edgeWidth,
              opacity: 1, // Start visible!
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: edgeColor,
              width: 20,
              height: 20,
            },
          });
          
          console.log(`✅ Created edge: ${edgeId}`, { source: themeId, target: noteId, color: edgeColor });
        });
      }
    });

    // Add insight edges
    if (insights && insights.length > 0) {
      insights.forEach((insight, insightIndex) => {
        if (insight.connectedThemes && insight.connectedThemes.length >= 2) {
          const theme1Index = themes.findIndex(t => t.name === insight.connectedThemes[0]);
          const theme2Index = themes.findIndex(t => t.name === insight.connectedThemes[1]);
          
          if (theme1Index !== -1 && theme2Index !== -1) {
            newEdges.push({
              id: `insight-edge-${insightIndex}`,
              source: `theme-${theme1Index}`,
              target: `theme-${theme2Index}`,
              type: 'default',
              animated: true,
              style: { 
                stroke: '#fbbf24',
                strokeWidth: 5,
                strokeDasharray: '10 5',
                opacity: 1,
              },
              label: '✨',
              labelStyle: { 
                fontSize: 16,
                fontWeight: 'bold',
              },
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

    console.log('📊 Created', newEdges.length, 'edges total');
    console.log('🎯 Edge IDs:', newEdges.map(e => e.id));

    // Set nodes and edges IMMEDIATELY
    setNodes(initialNodes);
    setEdges(newEdges);

    // PHASE 1: Fade in at center (0-200ms)
    setTimeout(() => {
      setNodes(nodes => nodes.map(node => ({
        ...node,
        style: { opacity: 1, transition: 'opacity 600ms ease-out' },
      })));
    }, 100);

    // PHASE 2: Explosion (200-2200ms) - SMOOTH
    setTimeout(() => {
      setNodes(nodes => nodes.map(node => {
        const explosionData = node.data.explosionTarget;
        if (explosionData) {
          return {
            ...node,
            position: explosionData,
            style: { 
              opacity: 1,
              transition: 'all 2000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoother easing
            },
          };
        }
        return node;
      }));
    }, 300);

    // PHASE 3: Settle to final positions (2200-5500ms) - SMOOTH
    setTimeout(() => {
      setNodes(nodes => nodes.map(node => {
        const finalPos = finalNodes.find(fn => fn.id === node.id);
        if (finalPos) {
          return {
            ...node,
            position: finalPos.position,
            style: { 
              opacity: 1,
              transition: 'all 3300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoother easing
            },
          };
        }
        return node;
      }));
    }, 2300);

    // PHASE 4: Complete
    setTimeout(() => {
      setIsAnimating(false);
      setNodes(nodes => nodes.map(node => ({
        ...node,
        style: { opacity: 1 },
      })));
      
      // Force fitView after animation
      setTimeout(() => {
        fitView({ padding: 0.45, duration: 800 });
      }, 500);
    }, 5800);

  }, [themes, notes, insights, setNodes, setEdges, animationKey, fitView]);

  if (!themes || themes.length === 0) {
    return (
      <div className="h-full min-h-[700px] flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-sage-900 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse-gentle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-center space-y-6 p-8 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <Brain size={64} className="mx-auto text-sage-400 opacity-30" />
            </div>
            <Brain size={64} className="mx-auto text-sage-300 relative drop-shadow-2xl" />
          </div>
          <div className="space-y-2">
            <p className="text-stone-200 font-light text-xl max-w-md drop-shadow-lg">
              Your thoughts await visualization
            </p>
            <p className="text-stone-400 text-sm">
              Add 3+ notes and generate insights to begin
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-300 bg-gradient-to-br from-stone-50 via-white to-stone-100 relative">
      {modalNote && (
        <NoteModal 
          note={modalNote} 
          onClose={() => setModalNote(null)}
          isAI={isModalAI}
        />
      )}
      
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-br from-sage-500/10 via-pink-500/10 to-blue-500/10 z-50 pointer-events-none backdrop-blur-[1px] animate-pulse-gentle"></div>
      )}
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.45,
          minZoom: 0.25,
          maxZoom: 0.65,
          duration: 1000,
        }}
        minZoom={0.15}
        maxZoom={2.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.32 }}
        defaultEdgeOptions={{
          style: { strokeWidth: 3 },
        }}
      >
        <Background 
          color="#d6d3d1" 
          gap={24} 
          size={1.5}
          variant="dots"
          className="opacity-40"
        />
        
        <Controls 
          className="!bg-gradient-to-br !from-white/95 !to-stone-100/95 !backdrop-blur-md !shadow-2xl !border-2 !border-stone-300 !rounded-xl"
          showInteractive={false}
        />
        
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'themeNode') return '#5f6b5f';
            if (node.type === 'aiNoteNode') return '#a855f7';
            return '#ffffff';
          }}
          maskColor="rgba(0, 0, 0, 0.15)"
          className="!bg-gradient-to-br !from-white/95 !to-stone-100/95 !backdrop-blur-md !shadow-2xl !border-2 !border-stone-300 !rounded-xl"
        />

        <Panel position="top-left" className="!bg-gradient-to-br !from-white/95 !to-stone-100/95 !backdrop-blur-md !px-5 !py-3 !shadow-2xl !border-2 !border-stone-300 !rounded-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-sage-700 to-sage-900 shadow-lg"></div>
              <span className="text-xs font-bold text-stone-800">Themes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-stone-400 shadow-lg"></div>
              <span className="text-xs font-bold text-stone-800">Your Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage-400 shadow-lg"></div>
              <span className="text-xs font-bold text-sage-400">AI Notes</span>
            </div>
          </div>
        </Panel>

        <Panel position="top-right" className="!bg-gradient-to-br !from-white/95 !to-stone-100/95 !backdrop-blur-md !px-5 !py-3 !shadow-2xl !border-2 !border-stone-300 !rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Stars size={16} className="text-sage-600" />
              <span className="text-sm font-black text-stone-800">
                {themes.length} {themes.length === 1 ? 'Theme' : 'Themes'}
              </span>
            </div>
            <div className="w-px h-4 bg-stone-300"></div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-sage-400" />
              <span className="text-sm font-black text-stone-800">
                {(() => {
                  let aiNoteCount = 0;
                  themes.forEach(theme => {
                    if (theme.notes) {
                      theme.notes.forEach(note => {
                        if (note.aiGenerated === true) {
                          aiNoteCount++;
                        }
                      });
                    }
                  });
                  return aiNoteCount;
                })()} AI {(() => {
                  let aiNoteCount = 0;
                  themes.forEach(theme => {
                    if (theme.notes) {
                      theme.notes.forEach(note => {
                        if (note.aiGenerated === true) {
                          aiNoteCount++;
                        }
                      });
                    }
                  });
                  return aiNoteCount === 1 ? 'Note' : 'Notes';
                })()}
              </span>
            </div>
          </div>
        </Panel>

        {isAnimating && (
          <Panel position="bottom-center" className="!bg-gradient-to-r !from-sage-600 !via-pink-600 !to-blue-600 !text-white !px-6 !py-3 !shadow-2xl !border-2 !border-sage-400 !rounded-full animate-pulse-gentle">
            <div className="flex items-center gap-3">
              <Zap size={18} className="animate-pulse-gentle" />
              <span className="text-sm font-black">
                Discovering Connections...
              </span>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
});

MindMap.displayName = 'MindMap';

export default MindMap;

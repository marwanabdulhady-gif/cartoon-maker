import React from 'react';
import { Scene } from '../types';

interface TimelineViewProps {
  scenes: Scene[];
  onSceneClick?: (scene: Scene) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ scenes, onSceneClick }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px] relative py-20">
        {/* The connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-600/20 via-brand-500 to-indigo-600/20 -translate-y-1/2 rounded-full"></div>
        
        <div className="flex justify-between items-center relative z-10">
          {scenes.map((scene, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={scene.sceneNumber} 
                className="flex flex-col items-center group cursor-pointer"
                style={{ width: `${100 / scenes.length}%` }}
                onClick={() => onSceneClick?.(scene)}
              >
                {/* Content Top */}
                <div className={`h-32 flex flex-col items-center justify-end mb-4 transition-all duration-300 group-hover:-translate-y-2 ${isEven ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-xl max-w-[150px] text-center">
                    <span className="text-[10px] font-bold text-brand-400 uppercase tracking-tighter block mb-1">{scene.location}</span>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{scene.actionDescription}</p>
                  </div>
                  <div className="w-0.5 h-6 bg-brand-500/50 mt-2"></div>
                </div>

                {/* Marker */}
                <div className="relative">
                   <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-white font-bold text-sm z-20 transition-all duration-300 group-hover:border-brand-500 group-hover:scale-110 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                     {scene.sceneNumber}
                   </div>
                   {/* Pulse effect for marker */}
                   <div className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-20 group-hover:opacity-40"></div>
                </div>

                {/* Content Bottom */}
                <div className={`h-32 flex flex-col items-center mt-4 transition-all duration-300 group-hover:translate-y-2 ${!isEven ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="w-0.5 h-6 bg-brand-500/50 mb-2"></div>
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-xl max-w-[150px] text-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter block mb-1">{scene.location}</span>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{scene.actionDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <p className="text-xs text-slate-500 italic">نصيحة: مرر أفقياً لرؤية التسلسل الزمني الكامل للقصة</p>
      </div>
    </div>
  );
};

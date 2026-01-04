import React, { useState, useEffect } from 'react';
import { StoryAsset } from '../types';
import { generateAssetImage } from '../services/geminiService';
import { CopyButton } from './CopyButton';

interface AssetModalProps {
  asset: StoryAsset;
  onClose: () => void;
  aspectRatio?: string;
}

export const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose, aspectRatio = "1:1" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateAssetImage(asset.imagePrompt, aspectRatio);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || "فشل توليد الصورة");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [asset]);

  // Handle closing on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-700 shadow-2xl flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 text-white rounded-full hover:bg-slate-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Preview Side */}
        <div className="w-full md:w-1/2 bg-slate-950 aspect-square flex items-center justify-center relative overflow-hidden group">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
              <p className="text-sm text-brand-400 font-medium animate-pulse">جاري الرسم...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-sm text-red-300">{error}</p>
              <button 
                onClick={handleGenerate}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={`${asset.name} - ${asset.type || 'عنصر قصة'}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={handleGenerate}
                  className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all"
                >
                  توليد نسخة أخرى
                </button>
              </div>
            </>
          ) : (
             <button 
                onClick={handleGenerate}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 rounded-xl font-bold text-white shadow-lg transition-all"
              >
                إنشاء صورة تخيلية
              </button>
          )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="mb-6">
             <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-0.5 bg-brand-500/20 text-brand-400 text-[10px] font-bold uppercase rounded border border-brand-500/20">
                 {asset.type || 'عنصر'}
               </span>
             </div>
             <h2 className="text-3xl font-extrabold text-white">{asset.name}</h2>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">الوصف</h3>
              <p className="text-slate-300 leading-relaxed">{asset.description}</p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">الأمر الهندسي (Prompt)</h3>
                 <CopyButton text={asset.imagePrompt} />
               </div>
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                 <p className="text-xs text-slate-400 font-mono leading-relaxed" dir="ltr">
                   {asset.imagePrompt}
                 </p>
               </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
             <button 
               onClick={onClose}
               className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-all"
             >
               إغلاق النافذة
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
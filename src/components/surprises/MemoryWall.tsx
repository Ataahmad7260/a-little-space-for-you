import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, MapPin, X, Sparkles, ZoomIn, Trash2 } from 'lucide-react';
import { content, type MemoryItem } from '../../data/content';
import { triggerCelestialBurst } from '../../utils/burstEffect';
import { sfx } from '../../utils/soundEffects';

export const MemoryWall: React.FC = () => {
  const { title, subtitle, initialMemories, addPrompt } = content.surpriseSection.memoryWall;

  // Load memories from localStorage if user added any, else fallback to initial
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_saved_memories');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return initialMemories;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('Moment');
  const [imageUrl, setImageUrl] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('user_saved_memories', JSON.stringify(memories));
    } catch {
      // Ignore
    }
  }, [memories]);

  // Handle image upload from computer (local preview)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'A timeless moment',
      location: newLocation.trim() || 'Together',
      image: imageUrl.trim() || '/images/memory-lake.jpg',
      caption: newCaption.trim() || 'A quiet, cherished memory.',
      tag: newTag.trim() || 'Memory',
    };

    setMemories([newMem, ...memories]);
    sfx.playStarChime();
    triggerCelestialBurst();

    // Reset form
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewCaption('');
    setImageUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSoftTap();
    setMemories(memories.filter((m) => m.id !== id));
    if (selectedMemory?.id === id) {
      setSelectedMemory(null);
    }
  };

  return (
    <div id="memories" className="relative w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-[#B8A9CD]/80 font-mono mb-2 inline-block">
          Interactive Surprise 03
        </span>
        <h3 className="font-serif-poetry text-3xl sm:text-4xl text-[#F5F0FF] mb-3 font-normal glow-text-subtle">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#B8A9CD]/80 font-light leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Add Memory Button */}
        <button
          onClick={() => {
            sfx.playSoftTap();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:border-[#E8B4C8]/50 text-xs sm:text-sm text-[#F5F0FF] transition-all duration-300 shadow-[0_0_15px_rgba(232,180,200,0.15)] group"
        >
          <Plus className="w-4 h-4 text-[#FFE8A3] group-hover:rotate-90 transition-transform" />
          <span>Add a Personal Memory</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E8B4C8]" />
        </button>
      </div>

      {/* Grid of Polaroid Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              sfx.playSoftTap();
              setSelectedMemory(mem);
            }}
            className="group cursor-pointer rounded-2xl glass-panel p-4 flex flex-col justify-between border border-[#B8A9CD]/20 hover:border-[#E8B4C8]/40 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(232,180,200,0.15)] transform hover:-translate-y-1.5"
          >
            {/* Top Photo Frame */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#161626] mb-4">
              <img
                src={mem.image}
                alt={mem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-[11px] text-[#FFE8A3] font-medium flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" /> Tap to view story
                </span>
                <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-white/80">
                  {mem.tag}
                </span>
              </div>
            </div>

            {/* Polaroid Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#B8A9CD]/70 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FFE8A3]" /> {mem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E8B4C8]" /> {mem.location}
                  </span>
                </div>

                <h4 className="font-serif-poetry text-xl text-[#F5F0FF] group-hover:text-[#E8B4C8] transition-colors mb-2">
                  {mem.title}
                </h4>

                <p className="text-xs text-[#B8A9CD]/80 font-light line-clamp-2 leading-relaxed">
                  {mem.caption}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#B8A9CD]/60">
                <span className="italic">A moment held in quiet blue</span>
                <button
                  onClick={(e) => handleDeleteMemory(mem.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 transition-opacity"
                  title="Remove memory"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL FOR VIEWING MEMORY */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-panel-glow rounded-3xl overflow-hidden border border-[#E8B4C8]/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-[#F5F0FF] hover:bg-black/80 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Enlarged Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#121222] overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Details */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#B8A9CD]/80 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#FFE8A3] font-medium">
                    {selectedMemory.tag}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selectedMemory.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedMemory.location}
                  </span>
                </div>

                <h3 className="font-serif-poetry text-2xl sm:text-3xl text-[#F5F0FF] mb-3">
                  {selectedMemory.title}
                </h3>

                <p className="font-serif-poetry text-base sm:text-lg text-[#F5F0FF]/90 leading-relaxed italic">
                  "{selectedMemory.caption}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD MEMORY MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 border border-[#B8A9CD]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#B8A9CD] hover:text-[#F5F0FF] transition-colors"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#FFE8A3]" />
                <h4 className="font-serif-poetry text-2xl text-[#F5F0FF]">
                  Pin a New Memory
                </h4>
              </div>

              <p className="text-xs text-[#B8A9CD]/80 mb-6">
                {addPrompt}
              </p>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                    Tag / Category
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['Starlight', 'Warmth', 'Sunset', 'Laughter', 'Quiet Hour', 'Memory'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewTag(t)}
                        className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                          newTag === t
                            ? 'bg-[#E8B4C8]/30 border border-[#E8B4C8] text-[#FFE8A3]'
                            : 'bg-white/5 border border-white/10 text-[#B8A9CD] hover:text-[#F5F0FF]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                    Memory Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Midnight Walk on the Beach"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F0FF] placeholder-white/30 text-sm focus:outline-none focus:border-[#E8B4C8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. October 18th"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F0FF] placeholder-white/30 text-sm focus:outline-none focus:border-[#E8B4C8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                      Location / Mood
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Under the lantern"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F0FF] placeholder-white/30 text-sm focus:outline-none focus:border-[#E8B4C8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                    Photo (Choose File or paste Image URL)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-[#B8A9CD] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-white/10 file:text-[#F5F0FF] hover:file:bg-white/20 cursor-pointer"
                    />
                  </div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste an image web link (https://...)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F0FF] placeholder-white/30 text-xs focus:outline-none focus:border-[#E8B4C8]"
                  />
                  {imageUrl && (
                    <div className="mt-2 w-16 h-12 rounded-lg overflow-hidden border border-white/20">
                      <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8A9CD]/80 mb-1">
                    Caption / Poetic Memory
                  </label>
                  <textarea
                    rows={3}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Write a few lines about what made this moment special..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#F5F0FF] placeholder-white/30 text-sm focus:outline-none focus:border-[#E8B4C8]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#B8A9CD] hover:text-[#F5F0FF] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B8A9CD] to-[#E8B4C8] text-[#0B0B14] font-medium text-xs hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(232,180,200,0.3)]"
                  >
                    Save Memory ♡
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

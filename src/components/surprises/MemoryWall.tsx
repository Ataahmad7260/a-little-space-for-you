import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, X, Sparkles, ZoomIn, Trash2, Camera } from 'lucide-react';
import { content, type MemoryItem } from '../../data/content';
import { triggerCelestialBurst } from '../../utils/burstEffect';
import { sfx } from '../../utils/soundEffects';

export const MemoryWall: React.FC = () => {
  const { title, subtitle, initialMemories, addPrompt } = content.surpriseSection.memoryWall;

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

  // Handle local file upload
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
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[#B37B24] font-mono mb-2 inline-block font-semibold">
          Interactive Surprise 03
        </span>
        <h3 className="font-serif-poetry text-3xl sm:text-5xl text-[#341829] mb-3 font-normal glow-text-subtle">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#664658] font-light leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Add Memory Button */}
        <button
          onClick={() => {
            sfx.playSoftTap();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-panel-gold hover:border-[#C74A76] text-xs sm:text-sm text-[#341829] transition-all duration-400 shadow-[0_4px_25px_rgba(184,82,120,0.14)] group cursor-pointer hover:-translate-y-1 font-medium"
        >
          <Camera className="w-4 h-4 text-[#B37B24] group-hover:scale-110 transition-transform" />
          <span>Pin a Treasured Moment</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C74A76]" />
        </button>
      </div>

      {/* GRID OF AESTHETIC POLAROID GLASS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            onClick={() => {
              sfx.playSoftTap();
              setSelectedMemory(mem);
            }}
            className="group cursor-pointer rounded-3xl glass-panel-gold p-4.5 flex flex-col justify-between border border-[#E8B48A]/40 hover:border-[#C74A76]/60 transition-all duration-400 hover:shadow-[0_20px_50px_rgba(184,82,120,0.18)] transform hover:-translate-y-2 hover:rotate-1"
          >
            {/* Washi Tape Pin Accent */}
            <div className="w-16 h-4 bg-[#FFE5EC] border border-[#F5B8CB] mx-auto -mt-6 mb-3 rounded-sm shadow-sm opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Photo Frame */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF0F4] mb-4.5 border border-[#F5B8CB]">
              <img
                src={mem.image}
                alt={mem.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                <span className="text-xs text-white font-medium flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5" /> View story
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-[10px] text-[#9E2B54] uppercase tracking-wider font-mono font-semibold">
                  {mem.tag}
                </span>
              </div>
            </div>

            {/* Polaroid Content */}
            <div className="flex-1 flex flex-col justify-between px-1">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8F6A7E] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B37B24]" /> {mem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C74A76]" /> {mem.location}
                  </span>
                </div>

                <h4 className="font-serif-poetry text-2xl text-[#341829] group-hover:text-[#C74A76] transition-colors mb-2">
                  {mem.title}
                </h4>

                <p className="text-xs text-[#664658] font-light line-clamp-2 leading-relaxed">
                  {mem.caption}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 pt-3.5 border-t border-[#F5B8CB]/50 flex items-center justify-between text-xs text-[#8F6A7E]">
                <span className="font-cursive text-xl text-[#C74A76]">held in quiet starlight</span>
                <button
                  onClick={(e) => handleDeleteMemory(mem.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-600 transition-opacity cursor-pointer"
                  title="Remove memory"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-panel-gold rounded-3xl overflow-hidden border border-[#E8B48A] shadow-[0_30px_80px_rgba(184,82,120,0.25)] max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 text-[#341829] hover:bg-white transition-colors cursor-pointer shadow-sm"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#FFF0F4] overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Details */}
              <div className="p-7 sm:p-9 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8F6A7E] mb-3 font-medium">
                  <span className="px-3 py-1 rounded-full bg-[#FFE5EC] text-[#9E2B54] font-semibold uppercase tracking-wider font-mono border border-[#F5B8CB]">
                    {selectedMemory.tag}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B37B24]" /> {selectedMemory.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C74A76]" /> {selectedMemory.location}
                  </span>
                </div>

                <h3 className="font-serif-poetry text-3xl sm:text-4xl text-[#341829] mb-3">
                  {selectedMemory.title}
                </h3>

                <p className="font-serif-poetry text-xl text-[#341829] leading-relaxed italic">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-7 sm:p-9 border border-[#E8B48A] shadow-[0_30px_70px_rgba(184,82,120,0.22)]"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FFE5EC] text-[#8F6A7E] hover:text-[#341829] transition-colors cursor-pointer"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <Sparkles className="w-5 h-5 text-[#B37B24]" />
                <h4 className="font-serif-poetry text-3xl text-[#341829]">
                  Pin a New Memory
                </h4>
              </div>

              <p className="text-xs text-[#664658] mb-6">
                {addPrompt}
              </p>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-2 font-mono font-semibold">
                    Select Mood / Tag
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['Starlight', 'Warmth', 'Sunset', 'Laughter', 'Quiet Hour', 'Memory'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewTag(t)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                          newTag === t
                            ? 'bg-[#FFE5EC] border border-[#C74A76] text-[#9E2B54] font-semibold'
                            : 'bg-white border border-[#F5B8CB] text-[#664658] hover:text-[#341829]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-1 font-mono font-semibold">
                    Memory Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Midnight Walk on the Beach"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F5B8CB] text-[#341829] placeholder-[#8F6A7E]/60 text-sm focus:outline-none focus:border-[#C74A76]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-1 font-mono font-semibold">
                      Date
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. October 18th"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F5B8CB] text-[#341829] placeholder-[#8F6A7E]/60 text-sm focus:outline-none focus:border-[#C74A76]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-1 font-mono font-semibold">
                      Location / Mood
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Under the lantern"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F5B8CB] text-[#341829] placeholder-[#8F6A7E]/60 text-sm focus:outline-none focus:border-[#C74A76]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-1 font-mono font-semibold">
                    Photo (Upload file or paste web image URL)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-[#664658] file:mr-2 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:bg-[#FFE5EC] file:text-[#9E2B54] file:font-semibold hover:file:bg-[#FCD3E1] cursor-pointer"
                    />
                  </div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste an image web link (https://...)"
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#F5B8CB] text-[#341829] placeholder-[#8F6A7E]/60 text-xs focus:outline-none focus:border-[#C74A76]"
                  />
                  {imageUrl && (
                    <div className="mt-2 w-16 h-12 rounded-lg overflow-hidden border border-[#F5B8CB]">
                      <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B37B24] mb-1 font-mono font-semibold">
                    Caption / Poetic Memory
                  </label>
                  <textarea
                    rows={3}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Write a few lines about what made this moment special..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F5B8CB] text-[#341829] placeholder-[#8F6A7E]/60 text-sm focus:outline-none focus:border-[#C74A76]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#8F6A7E] hover:text-[#341829] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE5EC] via-[#F5B8CB] to-[#F7E3B5] text-[#341829] font-semibold text-xs hover:opacity-95 transition-opacity shadow-sm cursor-pointer border border-[#E8B48A]"
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

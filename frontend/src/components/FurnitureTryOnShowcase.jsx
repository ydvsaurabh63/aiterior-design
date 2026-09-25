import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle2,
  Maximize2,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { furnitureTryOnItems } from '../data/furnitureTryOnItems';

const FurnitureTryOnShowcase = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const fileInputRef = useRef(null);

  // Default active item is LILLEHEM (item 5, index 4) as in the reference image
  const [selectedItem, setSelectedItem] = useState(
    furnitureTryOnItems.find((item) => item.defaultSelected) || furnitureTryOnItems[4]
  );

  const [productUrl, setProductUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewMode, setViewMode] = useState('furnished'); // 'furnished' | 'empty'
  const [customRoomImage, setCustomRoomImage] = useState(null);
  const [showHotspot, setShowHotspot] = useState(true);

  // Horizontal scroll controls for carousel
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle URL form submit
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!productUrl.trim()) {
      toast.error('Please enter a product link or choose one below');
      return;
    }

    setIsAnalyzing(true);
    toast.loading('Analyzing furniture dimensions and 3D mesh...', { id: 'ai-tryon' });

    setTimeout(() => {
      setIsAnalyzing(false);
      setViewMode('furnished');
      toast.success(`Success! Visualized product in room.`, { id: 'ai-tryon' });
    }, 1200);
  };

  // Quick preset click
  const handleSelectPreset = (item) => {
    setSelectedItem(item);
    setViewMode('furnished');
    setProductUrl(item.productUrl);
    toast.success(`Previewing ${item.name}`, { duration: 1800 });
  };

  // Handle custom room photo upload
  const handleRoomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomRoomImage(url);
      setViewMode('furnished');
      toast.success('Your room photo uploaded! Placing furniture in space...');
    }
  };

  // Determine current active room background
  const currentRoomSrc =
    viewMode === 'empty'
      ? customRoomImage || '/sample-rooms/room-showcase.jpg'
      : customRoomImage || selectedItem.roomImage || '/sample-rooms/room-furnished-sofa.jpg';

  return (
    <section className="relative bg-[#FAF9F5] border-b border-neutral-200/80 pt-10 pb-14 sm:pt-14 sm:pb-20 overflow-hidden font-sans">
      {/* Background ambient aesthetic glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/60 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split: Controls/Copy Left, Big Room Showcase Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Eyebrow, Bold Headline, Input Bar, Stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow text badge exactly like Image 1 */}
            <div className="inline-flex items-center gap-1.5 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase text-[#5B8F1D]">
                NO MORE “I THINK IT WILL WORK”
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.12] mb-3 sm:mb-4">
              See any furniture <br />
              in your room <br />
              <span className="text-[#7CB328]">before you buy it</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mb-6 sm:mb-7 max-w-md">
              Paste a product link and upload a room photo. Preview that item in your space before you buy.
            </p>

            {/* Input Bar Form */}
            <form onSubmit={handleUrlSubmit} className="relative w-full max-w-md">
              <div className="relative flex items-center bg-white rounded-full border border-neutral-300 shadow-sm hover:border-neutral-400 focus-within:border-[#7CB328] focus-within:ring-2 focus-within:ring-[#7CB328]/30 transition-all p-1.5 pl-5">
                <input
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="Paste a product link..."
                  className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-1 px-5 py-2.5 bg-[#84cc16] hover:bg-[#74b816] active:scale-95 text-neutral-950 font-bold text-xs sm:text-sm rounded-full transition-all shadow-sm"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>See it</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Activity Counter / Social Proof */}
            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-neutral-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84cc16] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84cc16]"></span>
              </span>
              <span>246 try-ons today</span>
            </div>

            {/* Interactive helper pills */}
            <div className="mt-6 pt-5 border-t border-neutral-200/70 flex flex-wrap items-center gap-2 max-w-md">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Quick Try:</span>
              <button
                type="button"
                onClick={() => handleSelectPreset(furnitureTryOnItems[4])}
                className={`text-xs px-2.5 py-1 rounded-full transition-all border ${
                  selectedItem.id === 'lillehem-modular-sofa'
                    ? 'bg-[#84cc16]/15 border-[#84cc16] text-neutral-900 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                IKEA LILLEHEM Sofa
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(furnitureTryOnItems[8])}
                className={`text-xs px-2.5 py-1 rounded-full transition-all border ${
                  selectedItem.id === 'solid-wood-armchair'
                    ? 'bg-[#84cc16]/15 border-[#84cc16] text-neutral-900 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                Oak Armchair
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(furnitureTryOnItems[0])}
                className={`text-xs px-2.5 py-1 rounded-full transition-all border ${
                  selectedItem.id === 'latitude-run-sectional'
                    ? 'bg-[#84cc16]/15 border-[#84cc16] text-neutral-900 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                Dark Sectional
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: The Room Showcase (The 2nd Image) with Furniture Preview */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 bg-neutral-900 group aspect-[16/10] sm:aspect-[16/10] w-full">
              {/* Room Image Display */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentRoomSrc}
                  src={currentRoomSrc}
                  alt="Interior Room Try-on Preview"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center select-none"
                />
              </AnimatePresence>

              {/* Ambient gradient at bottom for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Controls Overlay: Empty vs Furnished Room toggle & Upload Custom Room */}
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-20">
                {/* Empty vs Furnished Toggle */}
                <div className="inline-flex p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                  <button
                    type="button"
                    onClick={() => setViewMode('furnished')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      viewMode === 'furnished'
                        ? 'bg-[#84cc16] text-neutral-950 shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Furnished
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('empty')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      viewMode === 'empty'
                        ? 'bg-white text-neutral-950 shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Original Room
                  </button>
                </div>

                {/* Upload your own room button */}
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleRoomUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-medium transition-all shadow-sm"
                    title="Upload your own room photo"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span className="hidden sm:inline">Use My Room</span>
                  </button>
                </div>
              </div>

              {/* Interactive Hotspot Marker on furniture in room */}
              {viewMode === 'furnished' && showHotspot && (
                <div className="absolute bottom-[28%] left-[45%] z-20 pointer-events-auto">
                  <div className="relative group/spot cursor-pointer">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-white opacity-60"></span>
                    <div className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/90 text-neutral-900 shadow-lg border border-white">
                      <span className="w-2 h-2 rounded-full bg-[#84cc16]"></span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-neutral-950/95 text-white text-xs rounded-xl shadow-2xl border border-white/10 opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
                      <p className="font-bold text-white text-[11px] truncate">{selectedItem.name}</p>
                      <div className="flex justify-between items-center text-[10px] text-neutral-300 mt-1">
                        <span>{selectedItem.brand}</span>
                        <span className="text-[#a3e635] font-mono font-semibold">{selectedItem.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FLOATING PILL AT BOTTOM OVERLAY (Exactly as shown in Image 1) */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20">
                <div className="bg-[#151614]/90 backdrop-blur-md text-white rounded-full py-2 px-3 sm:py-2.5 sm:px-5 flex items-center justify-between gap-3 shadow-2xl border border-white/15">
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    {/* Brand Pill */}
                    <span className="bg-white text-neutral-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded tracking-wider uppercase flex-shrink-0">
                      {selectedItem.brand}
                    </span>

                    {/* Product Name & Dimensions */}
                    <div className="truncate text-xs sm:text-sm font-medium text-neutral-100">
                      <span>{selectedItem.name}</span>
                      <span className="ml-2 font-mono text-[11px] sm:text-xs text-[#a3e635] font-normal">
                        {selectedItem.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Right Button: "try it →" */}
                  <button
                    type="button"
                    onClick={() => navigate('/try-with-ai')}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#84cc16] hover:text-[#a3e635] hover:underline transition-all group"
                  >
                    <span>try it</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CAROUSEL / ROW OF FURNITURE PRODUCTS (Exactly as shown in Image 1) */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-neutral-200/80">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Popular items tried by customers
            </p>
            {/* Scroll navigation arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-7 h-7 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all shadow-xs"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-7 h-7 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all shadow-xs"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Card Track */}
          <div
            ref={carouselRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {furnitureTryOnItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectPreset(item)}
                  className={`flex-shrink-0 w-32 sm:w-36 md:w-40 bg-white rounded-xl sm:rounded-2xl p-2.5 cursor-pointer transition-all duration-200 snap-start flex flex-col justify-between select-none ${
                    isSelected
                      ? 'border-2 border-[#84cc16] ring-2 ring-[#84cc16]/20 bg-lime-50/15 shadow-md scale-[1.02]'
                      : 'border border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full h-24 sm:h-28 bg-[#F7F7F6] rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#84cc16]" />
                    )}
                  </div>

                  {/* Brand and Time metadata line */}
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-medium mb-1">
                    <span className="font-bold text-neutral-700 truncate max-w-[65px]">{item.brand}</span>
                    <span className="flex-shrink-0">{item.time}</span>
                  </div>

                  {/* Product Title */}
                  <h4
                    className="text-[11px] sm:text-xs font-semibold text-neutral-800 line-clamp-2 leading-tight"
                    title={item.name}
                  >
                    {item.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureTryOnShowcase;

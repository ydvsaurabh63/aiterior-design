import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { chairPairingItems } from '../data/pairingShowcaseItems';

const FurniturePairingShowcase = () => {
  // Default to the 2nd item (Groton Dining Chair) as in the user's screenshot
  const [currentIndex, setCurrentIndex] = useState(1);
  const activeItem = chairPairingItems[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? chairPairingItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === chairPairingItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 border-b border-neutral-200/80 overflow-hidden font-sans bg-[#FAF8F5]">
      {/* Subtle architectural graph paper grid background matching the screenshot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Heading, Subtext, "More examples ->" */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 tracking-tight leading-[1.15] mb-4 sm:mb-5">
              Not sure what goes with what?
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mb-6 sm:mb-8 max-w-md">
              Keep the room exactly as it is and try the piece you are missing — chairs for your table, a
              nightstand for the bed, a rug under the sofa. You see at once what goes together.
            </p>

            <div>
              <Link
                to="/try-with-ai"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-900 hover:text-studio-bronze transition-colors group"
              >
                <span>More examples</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: The Room Showcase with Top Tag, Navigation Arrows & Chair Selector */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            {/* The Main Room Image Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-neutral-300/80 bg-neutral-100 aspect-[4/3] sm:aspect-[16/10] w-full group">
              {/* Room Image with Smooth Crossfade Animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.roomImage}
                  alt={activeItem.name}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-center select-none"
                />
              </AnimatePresence>

              {/* Floating Tag in Top-Left Corner: "Which chairs go here?" */}
              <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 z-20">
                <div className="bg-white/95 backdrop-blur-md text-neutral-900 text-[10px] sm:text-xs md:text-sm font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md border border-black/5 flex items-center gap-1.5">
                  <span>{activeItem.tag}</span>
                </div>
              </div>

              {/* Navigation Arrow Left */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 border border-black/10"
                aria-label="Previous chair"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Navigation Arrow Right */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 border border-black/10"
                aria-label="Next chair"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Bottom Overlay Floating Pill (White pill with Brand, Title, Dimensions) */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-5 sm:right-5 z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-full py-1.5 px-3 sm:py-2.5 sm:px-5 flex items-center justify-between shadow-lg border border-black/10 text-neutral-900 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                    {/* Brand Identifier */}
                    <span className="text-[9px] sm:text-xs font-black tracking-wider uppercase text-neutral-800 font-mono flex-shrink-0">
                      {activeItem.brand}
                    </span>

                    {/* Chair Title */}
                    <span className="text-[11px] sm:text-sm font-semibold truncate text-neutral-900">
                      {activeItem.name}
                    </span>
                  </div>

                  {/* Dimensions */}
                  <span className="text-[9px] sm:text-xs font-mono text-neutral-500 font-normal flex-shrink-0 ml-1">
                    {activeItem.dimensions}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Chair Selection Cards (Horizontal Grid/Row matching the screenshot) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-1">
              {chairPairingItems.map((item, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-3 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${
                      isSelected
                        ? 'border-2 border-[#84cc16] ring-2 ring-[#84cc16]/25 bg-lime-50/15 shadow-md scale-[1.01]'
                        : 'border border-neutral-200/90 hover:border-neutral-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Chair Thumbnail on clean background */}
                    <div className="w-full h-16 sm:h-24 md:h-28 bg-[#FAFAFA] rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center p-1 sm:p-2 mb-1.5 relative">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105"
                      />
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#84cc16]" />
                      )}
                    </div>

                    {/* Bottom Metadata: Brand + Name + Dimensions */}
                    <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-700 font-medium">
                      <div className="flex items-center gap-1 truncate">
                        <span className="font-bold uppercase tracking-tight text-neutral-900 text-[9px] sm:text-[10px]">
                          {item.brand}
                        </span>
                        <span className="truncate font-semibold text-[9px] sm:text-[11px]">{item.name.split(' ')[0]}</span>
                      </div>
                      <span className="font-mono text-neutral-400 text-[8px] sm:text-[10px] flex-shrink-0 ml-1">
                        {item.dimensions}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurniturePairingShowcase;

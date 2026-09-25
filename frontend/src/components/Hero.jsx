import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Pause, Volume2, VolumeX, Eye } from 'lucide-react';

const scenes = [
  {
    id: 'house',
    label: '3D House Walkthrough',
    src: '/videos/modern-house.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/27543/27543-720.mp4',
    poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
    tag: 'Architectural 3D Tour'
  },
  {
    id: 'interior',
    label: 'Luxury Interior Suite',
    src: '/videos/luxury-interior.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/4196/4196-720.mp4',
    poster: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
    tag: 'Bespoke Living Space'
  }
];

const Hero = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeScene = scenes[activeSceneIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound restricted, fallback to muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
    }
  }, [activeSceneIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-studio-dark">
      {/* 3D House Background Video with Cinematic Darkened Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={activeScene.id}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={activeScene.poster}
          className="w-full h-full object-cover object-center scale-105 transition-opacity duration-1000"
        >
          <source src={activeScene.src} type="video/mp4" />
          <source src={activeScene.fallbackSrc} type="video/mp4" />
        </video>

        {/* Multi-layered cinematic gradient overlays for luxury editorial contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-dark via-studio-dark/75 to-studio-dark/50" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Floating Interactive Video Scene Controller - Responsive Positioning */}
      {/* Desktop Version: Top-Right */}
      <div className="hidden sm:flex absolute top-24 right-6 lg:right-8 z-20 flex-col items-end gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 shadow-2xl">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                activeSceneIndex === idx
                  ? 'bg-white text-studio-charcoal shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label={isPlaying ? 'Pause 3D Tour' : 'Play 3D Tour'}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white transition-all duration-200 hover:scale-105"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white transition-all duration-200 hover:scale-105"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Version: Discreet Compact Controls in Bottom Corner */}
      <div className="flex sm:hidden absolute bottom-3 right-3 z-20 items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white">
        <button
          onClick={() => setActiveSceneIndex((prev) => (prev === 0 ? 1 : 0))}
          title="Switch 3D View"
          className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center gap-1"
        >
          <Eye className="w-3 h-3 text-studio-bronzeLight" />
          <span>{activeSceneIndex === 0 ? 'Interior' : 'Villa'}</span>
        </button>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          className="p-1.5 rounded-full hover:bg-white/20"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-1.5 rounded-full hover:bg-white/20"
        >
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16 sm:py-24 mt-4 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-studio-bronzeLight text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] font-medium mb-4 sm:mb-8 shadow-lg max-w-[90%] truncate"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-studio-bronzeLight opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-studio-bronze"></span>
          </span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-studio-bronze flex-shrink-0" />
          <span className="truncate">{activeScene.tag}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight font-normal text-white leading-[1.15] sm:leading-[1.08] mb-4 sm:mb-6 drop-shadow-lg px-1 sm:px-2"
        >
          Designing Spaces That <br className="hidden sm:inline" />
          <span className="italic font-light text-stone-200">Feel Like Home</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg lg:text-xl text-stone-300 font-light leading-relaxed mb-6 sm:mb-10 px-2 sm:px-4 drop-shadow"
        >
          Thoughtfully designed interiors crafted around your lifestyle, comfort and personality.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-5 w-full max-w-xs sm:max-w-none mx-auto"
        >
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-studio-charcoal text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold hover:bg-studio-bronze hover:text-white transition-all duration-300 shadow-2xl"
          >
            <span>Explore Designs</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
          <button
            onClick={() => setActiveSceneIndex((prev) => (prev === 0 ? 1 : 0))}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium backdrop-blur-md transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5 text-studio-bronzeLight" />
            <span>Switch 3D View</span>
          </button>
        </motion.div>

        {/* Floating Quick Stats (2 col on mobile, 4 col on desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 pt-6 sm:pt-14 mt-6 sm:mt-10 border-t border-white/15 text-white max-w-4xl mx-auto backdrop-blur-xs"
        >
          <div className="p-1.5 sm:p-2">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-studio-bronzeLight">150+</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Homes Transformed</p>
          </div>
          <div className="p-1.5 sm:p-2">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-studio-bronzeLight">12+</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Years of Craft</p>
          </div>
          <div className="p-1.5 sm:p-2">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-studio-bronzeLight">100%</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Turnkey Handover</p>
          </div>
          <div className="p-1.5 sm:p-2">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-studio-bronzeLight">25+</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Design Accolades</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


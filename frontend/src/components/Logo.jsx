import React from 'react';

const Logo = ({ size = 'md', variant = 'light', showTagline = true, className = '' }) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-studio-charcoal';
  const taglineColor = variant === 'dark' ? 'text-stone-400' : 'text-studio-muted';

  // Sizing definitions
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const titleSizes = {
    sm: 'text-lg tracking-tight font-extrabold',
    md: 'text-xl sm:text-2xl tracking-tight font-extrabold',
    lg: 'text-3xl sm:text-4xl tracking-tight font-extrabold',
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9.5px] sm:text-[10.5px] tracking-[0.22em]',
    lg: 'text-[11px] sm:text-[12px] tracking-[0.28em]',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Logo Mark (3D Arch + Leaf + Backlight) */}
      <div className={`relative flex items-center justify-center ${iconSizes[size] || iconSizes.md}`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Ambient backlight glow */}
            <radialGradient id="aiBacklight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E9A550" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#C48439" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C48439" stopOpacity="0" />
            </radialGradient>

            {/* Wood curve gradient */}
            <linearGradient id="woodGradient" x1="20" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EAE3D2" />
              <stop offset="50%" stopColor="#D8BC9B" />
              <stop offset="100%" stopColor="#C48439" />
            </linearGradient>

            {/* Organic leaf green gradient */}
            <linearGradient id="leafGradient" x1="75" y1="30" x2="95" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#697D56" />
              <stop offset="60%" stopColor="#546644" />
              <stop offset="100%" stopColor="#3C4B30" />
            </linearGradient>

            {/* Top sphere wood gradient */}
            <radialGradient id="topEmblem" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#D4A05B" />
              <stop offset="70%" stopColor="#A86C29" />
              <stop offset="100%" stopColor="#7A4B17" />
            </radialGradient>
          </defs>

          {/* Glowing Halo around top emblem & arch interior */}
          <circle cx="82" cy="22" r="18" fill="url(#aiBacklight)" opacity="0.8" />
          <path d="M 25 75 Q 55 45 68 70 Q 75 85 85 85" fill="none" stroke="url(#aiBacklight)" strokeWidth="12" strokeLinecap="round" opacity="0.5" />

          {/* Top Wooden Sphere */}
          <circle cx="82" cy="22" r="13" fill="url(#topEmblem)" />
          <circle cx="82" cy="22" r="12.5" fill="none" stroke="#FAF7F2" strokeWidth="0.8" opacity="0.6" />

          {/* Interior Vertical Wood Slats */}
          <g opacity="0.85">
            <line x1="58" y1="56" x2="58" y2="92" stroke="#4A341D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="64" y1="60" x2="64" y2="92" stroke="#4A341D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="70" y1="64" x2="70" y2="92" stroke="#4A341D" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Main Architectural Smooth 'a' Arch Curve */}
          <path
            d="M 18 92 C 18 52, 45 28, 70 34 C 82 37, 85 48, 72 58 C 55 70, 32 65, 30 92 Z"
            fill="url(#woodGradient)"
          />

          {/* Arch Inner Shadow / Highlight Edge */}
          <path
            d="M 22 90 C 22 56, 46 33, 68 38 C 76 40, 78 48, 68 56 C 54 66, 35 62, 33 90"
            fill="none"
            stroke="#FFF"
            strokeWidth="1.2"
            opacity="0.55"
          />

          {/* Inner Light Fixture Lamp */}
          <circle cx="52" cy="50" r="3.5" fill="#E9A550" />
          <line x1="52" y1="36" x2="52" y2="47" stroke="#8F6E3B" strokeWidth="1.2" />

          {/* Right Organic Leaf Pillar 'i' */}
          <path
            d="M 76 35 C 76 35, 96 35, 95 92 C 84 92, 76 80, 76 35 Z"
            fill="url(#leafGradient)"
          />

          {/* Leaf Curve Center Highlight */}
          <path
            d="M 86 38 C 87 55, 84 75, 78 88"
            fill="none"
            stroke="#8E9F7B"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-sans font-bold leading-none ${textColor} ${
            titleSizes[size] || titleSizes.md
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          aiterior
        </span>
        {showTagline && (
          <span
            className={`font-sans font-medium uppercase leading-tight mt-0.5 sm:mt-1 ${taglineColor} ${
              subtitleSizes[size] || subtitleSizes.md
            }`}
          >
            Reimagine Spaces with AI
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;

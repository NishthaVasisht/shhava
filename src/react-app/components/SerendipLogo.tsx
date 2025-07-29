interface SerendipLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function SerendipLogo({ size = 40, className = "", animate = false }: SerendipLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'animate-pulse-glow' : ''}`}
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main heart shape formed by two curves */}
      <g filter="url(#glow)">
        {/* Left curve */}
        <path
          d="M25 35 Q15 15, 35 25 Q45 35, 35 55 Q30 65, 50 75"
          stroke="url(#heartGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className={animate ? 'animate-float' : ''}
        />
        
        {/* Right curve */}
        <path
          d="M75 35 Q85 15, 65 25 Q55 35, 65 55 Q70 65, 50 75"
          stroke="url(#heartGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className={animate ? 'animate-float-reverse' : ''}
        />

        {/* Heart center where curves meet */}
        <circle
          cx="50"
          cy="75"
          r="3"
          fill="url(#heartGradient)"
          className={animate ? 'animate-heart-beat' : ''}
        />
      </g>

      {/* Serendipitous sparkles */}
      <g className={animate ? 'animate-shimmer' : ''}>
        {/* Small sparkles */}
        <circle cx="20" cy="25" r="1.5" fill="url(#sparkleGradient)" opacity="0.8" />
        <circle cx="80" cy="30" r="1" fill="url(#sparkleGradient)" opacity="0.6" />
        <circle cx="30" cy="80" r="1.2" fill="url(#sparkleGradient)" opacity="0.7" />
        <circle cx="70" cy="85" r="0.8" fill="url(#sparkleGradient)" opacity="0.5" />

        {/* Medium sparkles */}
        <circle cx="15" cy="50" r="2" fill="url(#sparkleGradient)" opacity="0.4" />
        <circle cx="85" cy="55" r="1.5" fill="url(#sparkleGradient)" opacity="0.6" />

        {/* Star sparkles */}
        <g transform="translate(25,15) scale(0.8)">
          <path
            d="M0,-4 L1.2,-1.2 L4,0 L1.2,1.2 L0,4 L-1.2,1.2 L-4,0 L-1.2,-1.2 Z"
            fill="url(#sparkleGradient)"
            opacity="0.7"
          />
        </g>

        <g transform="translate(75,20) scale(0.6)">
          <path
            d="M0,-4 L1.2,-1.2 L4,0 L1.2,1.2 L0,4 L-1.2,1.2 L-4,0 L-1.2,-1.2 Z"
            fill="url(#sparkleGradient)"
            opacity="0.5"
          />
        </g>
      </g>

      {/* Cultural accent - subtle mandala pattern in background */}
      <g opacity="0.1">
        <circle cx="50" cy="50" r="35" stroke="url(#heartGradient)" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="25" stroke="url(#heartGradient)" strokeWidth="0.3" fill="none" strokeDasharray="1,3" />
      </g>
    </svg>
  );
}

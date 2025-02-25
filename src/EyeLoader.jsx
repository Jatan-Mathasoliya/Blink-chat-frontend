import React, { useEffect, useState } from 'react';

const RefinedEyeLoader = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // Handle blinking animation with decreased timing
  useEffect(() => {
    // Initial delay before first blink
    const initialTimeout = setTimeout(() => {
      blink();
    }, 500);

    // Set up the blinking interval - decreased to 1.5-3 seconds
    const blinkIntervalId = setInterval(() => {
      blink();
      
      // Occasionally do a double-blink
      if (Math.random() > 0.7) {
        setTimeout(blink, 300);
      }
    }, 1500 + Math.random() * 1500); // Random interval between 1.5-3 seconds

    // Cleanup function
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(blinkIntervalId);
    };
  }, []);

  // Handle subtle pupil movement
  useEffect(() => {
    const movePupil = () => {
      // Generate random subtle movement values between -8% and 8%
      const newX = (Math.random() * 16 - 8) / 100;
      const newY = (Math.random() * 16 - 8) / 100;
      setPupilPosition({ x: newX, y: newY });
    };

    // Move pupil every 2 seconds
    const pupilIntervalId = setInterval(movePupil, 1000);
    
    return () => clearInterval(pupilIntervalId);
  }, []);

  const blink = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 150); // Slightly faster blink
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        {/* Eye container */}
        <div className="relative w-40 h-24 flex justify-center items-center">
          {/* Outer glow */}
          <div className="absolute w-40 h-20 bg-purple-600 rounded-full opacity-20 filter blur-xl animate-pulse"></div>
          
          {/* Perfect eye shape using SVG */}
          <div className="relative w-36 h-20 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              {/* Perfectly symmetrical eye shape */}
              <ellipse 
                cx="90" 
                cy="50" 
                rx="70" 
                ry="40" 
                fill="#1f2937" 
                stroke="#9333ea" 
                strokeWidth="2.5"
              />
            </svg>
            
            {/* White of the eye (sclera) */}
            <div className="absolute w-28 h-28 bg-gray-800 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Iris texture - radial lines */}
              <div className="w-full h-full rounded-full relative overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full h-0.5 bg-purple-900 opacity-30 top-1/2 left-0"
                    style={{ transform: `translateY(-50%) rotate(${i * 15}deg)` }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Pupil with subtle movement */}
            <div 
              className="absolute w-14 h-14 rounded-full top-1/2 left-1/2 transition-all duration-1000 ease-in-out"
              style={{ 
                transform: `translate(calc(-50% + ${pupilPosition.x * 100}%), calc(-50% + ${pupilPosition.y * 100}%))`,
                background: 'radial-gradient(circle, #a855f7 0%, #7e22ce 100%)'
              }}
            >
              {/* Main highlight */}
              <div className="absolute w-5 h-5 bg-white rounded-full opacity-80 top-1/4 left-1/4"></div>
              {/* Secondary smaller highlight */}
              <div className="absolute w-2 h-2 bg-white rounded-full opacity-60 bottom-1/4 right-1/4"></div>
            </div>
            
            {/* Eyelids with smooth transition */}
            <div 
              className="absolute w-full h-1/2 bg-gray-900 top-0 transition-all duration-150 ease-in-out z-10"
              style={{ 
                transformOrigin: 'top', 
                transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)',
                borderBottom: '1px solid #9333ea' 
              }}
            ></div>
            <div 
              className="absolute w-full h-1/2 bg-gray-900 bottom-0 transition-all duration-150 ease-in-out z-10"
              style={{ 
                transformOrigin: 'bottom', 
                transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)',
                borderTop: '1px solid #9333ea' 
              }}
            ></div>
          </div>
        </div>
        
        {/* Loading text with pulse effect */}
        <div className="mt-6 text-white font-light tracking-widest text-lg">
          <span className="inline-block animate-pulse">L</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>O</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>A</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>D</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>I</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>N</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>G</span>
        </div>
      </div>
    </div>
  );
};

export default RefinedEyeLoader;
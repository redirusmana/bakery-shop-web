"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOW_DURATION = 2500;
const SLIDE_DURATION = 800;

export const SplashScreen = () => {
  const [stage, setStage] = useState<'idle' | 'sliding-out' | 'hidden'>('idle');
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 100);

    const slideTimer = setTimeout(() => {
      setStage('sliding-out');

      const cleanupTimer = setTimeout(() => {
        setStage('hidden');
      }, SLIDE_DURATION);

      return () => clearTimeout(cleanupTimer);
    }, SHOW_DURATION);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  if (stage === 'hidden') return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center bg-primary
        transition-transform ease-in-out will-change-transform
        ${stage === 'sliding-out' ? "-translate-y-full" : "translate-y-0"}
      `}
      style={{ transitionDuration: `${SLIDE_DURATION}ms` }}
    >
      <div className="relative">
        <Image
          src="/union-bakery-light.png"
          alt="Union Bakery Logo"
          priority
          className={`
            w-[7rem] md:w-[8.5rem] h-auto object-contain 
            transition-opacity duration-1000 ease-out
            ${isLogoVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
          width={136}
          height={50}
        />
      </div>
    </div>
  );
};
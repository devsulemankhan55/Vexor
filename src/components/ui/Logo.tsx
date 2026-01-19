import React from 'react';
import logoLight from '../../assets/logoLight.png';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoLight} 
        alt="VEXOR" 
        className={`h-10 md:h-14 w-auto object-contain transition-all duration-300`} 
      />
    </div>
  );
};

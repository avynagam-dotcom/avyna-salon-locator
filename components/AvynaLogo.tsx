'use client';

interface AvynaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AvynaLogo({ className = '', size = 'md' }: AvynaLogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const dotSizeClass = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`${sizeClasses[size]} font-serif font-bold text-avyna-black tracking-tight leading-none`}>
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full mr-1.5 align-middle`} />
        A
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full mx-1.5 align-middle`} />
        V
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full mx-1.5 align-middle`} />
        Y
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full mx-1.5 align-middle`} />
        N
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full mx-1.5 align-middle`} />
        A
        <span className={`inline-block ${dotSizeClass[size]} bg-avyna-black rounded-full ml-1.5 align-middle`} />
        <span className="text-[0.5em] align-super ml-0.5 font-normal leading-none">®</span>
      </span>
    </div>
  );
}

import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

interface DarkModeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function DarkModeToggle({ size = 'md', showLabel = true }: DarkModeToggleProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover-lift animate-slide-in-right group`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className={`${iconSizes[size]} text-yellow-500 animate-bounce-gentle group-hover:animate-spin`} />
      ) : (
        <Moon className={`${iconSizes[size]} text-purple-600 animate-bounce-gentle group-hover:animate-pulse-glow`} />
      )}
      {showLabel && size !== 'sm' && (
        <span className="sr-only">
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      )}
    </button>
  );
}

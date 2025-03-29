import { useNavigate } from 'react-router';
import { cn } from '~/lib/utils';

interface RegisterSpeakerButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function RegisterSpeakerButton({
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: RegisterSpeakerButtonProps) {
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'h-9 px-3 py-2 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-11 px-5 py-2.5 text-base',
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-complete text-white hover:bg-complete/90 shadow-sm',
    outline: 'border border-stroke bg-transparent text-text-2 hover:bg-background-1/30',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      Register as Speaker
    </button>
  );
}

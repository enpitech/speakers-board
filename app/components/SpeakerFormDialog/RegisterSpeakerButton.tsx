import { useState } from 'react';
import { SpeakerFormDialogContainer } from './SpeakerFormDialogContainer';
import type { SpeakerFormData } from './SpeakerFormDialogView';
import { cn } from '~/lib/utils';

interface RegisterSpeakerButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onSubmit?: (data: SpeakerFormData) => Promise<void>;
}

export function RegisterSpeakerButton({
  variant = 'primary',
  size = 'md',
  className = '',
  onSubmit,
}: RegisterSpeakerButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSubmit = async (data: SpeakerFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      // Default implementation if no onSubmit is provided
      console.log('Speaker registration data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    }
  };

  // Button size styles - refined for pixel-perfect rendering
  const sizeClasses = {
    sm: 'h-9 px-3 py-2 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-11 px-5 py-2.5 text-base',
  };

  // Button variant styles - refined with exact color values
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-complete text-white hover:bg-complete/90 shadow-sm',
    outline: 'border border-stroke bg-transparent text-text-2 hover:bg-background-1/30',
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      >
        Register as Speaker
      </button>

      <SpeakerFormDialogContainer
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </>
  );
}

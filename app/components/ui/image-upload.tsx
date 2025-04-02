import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { ImageIcon, X } from 'lucide-react';
import { useState, useRef } from 'react';
import type { ImageUploadInputProps } from '~/types/image-upload';
import { imageFileSchema } from '~/types/image-upload';

const ImageUploadInput = ({
  className,
  onFileUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  showPreview = true,
  previewClassName,
  error,
  label,
  required = false,
  disabled = false,
}: ImageUploadInputProps) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    try {
      // Update schema with custom max size
      const customSchema = imageFileSchema.refine(data => data.file.size < maxSize, {
        message: t('File size must be less than {{size}}MB', {
          size: maxSize / (1024 * 1024),
        }),
      });

      customSchema.parse({ file });
      onFileUpload(file);

      if (showPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('File validation error:', error);
      setPreview(null);
      throw error;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-4 transition-colors',
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          aria-label={t('Upload image')}
        />

        {preview ? (
          <div className={cn('relative', previewClassName)}>
            <img src={preview} alt={t('Preview')} className="w-full h-auto rounded-lg" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
              onClick={handleRemove}
              aria-label={t('Remove image')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <p>{t('Drag and drop your image here, or')}</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
              >
                {t('Browse')}
              </Button>
              <p className="mt-1 text-xs text-gray-500">
                {t('PNG, JPG, GIF up to {{size}}MB', {
                  size: maxSize / (1024 * 1024),
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Error boundary wrapper
const ImageUploadInputWithErrorBoundary = (props: ImageUploadInputProps) => (
  <ErrorBoundary
    fallback={<div className="p-4 text-center text-red-500">Error loading image upload</div>}
  >
    <ImageUploadInput {...props} />
  </ErrorBoundary>
);

export default ImageUploadInputWithErrorBoundary;

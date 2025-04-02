import { z } from 'zod';

export const imageFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.type.startsWith('image/'), {
      message: 'File must be an image',
    })
    .refine(file => file.size < 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    }),
});

export type ImageFile = z.infer<typeof imageFileSchema>['file'];

export interface ImageUploadInputProps {
  className?: string;
  onFileUpload: (file: ImageFile) => void;
  accept?: string;
  maxSize?: number;
  showPreview?: boolean;
  previewClassName?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

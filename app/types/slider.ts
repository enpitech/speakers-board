import { z } from 'zod';

export const sliderItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  imageUrl: z.string().url(),
  altText: z.string().optional(),
});

export const sliderSchema = z.array(sliderItemSchema);

export type SliderItem = z.infer<typeof sliderItemSchema>;

export interface MobileSliderProps {
  items: SliderItem[];
  className?: string;
  onSlideChange?: (index: number) => void;
  showNavigation?: boolean;
  showPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

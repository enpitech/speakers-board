import { User, Youtube } from 'lucide-react';
import { Form } from 'react-router';
import { TextInput } from '~/components/ui/form/TextInput';
import { SocialNetworkInput } from '~/components/ui/form/SocialNetworkInput';
import { FormError } from '~/components/ui/form/FormError';
import type { SpeakerFormData } from '~/lib/types';
import { TextareaInput } from '~/components/ui/form/TextareaInput';
import { ChipInput } from '~/components/ui/ChipInput';
import { Text } from '~/components/Text';
import { Button } from './ui/button';
import { ImageUploadInput } from './ui/form/ImageUploadInput';

type SpeakerFormDialogViewProps = {
  formData: SpeakerFormData;
  onChange: (data: Partial<SpeakerFormData>) => void;
  onAddSocialNetwork: () => void;
  onRemoveSocialNetwork: (index: number) => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
};

export function SpeakerFormDialogView({
  formData,
  onChange,
  onAddSocialNetwork,
  onRemoveSocialNetwork,
  errors,
  isSubmitting,
}: SpeakerFormDialogViewProps) {
  return (
    <Form method="post" action="/speakers" className="space-y-6">
      {/* Show generic form error if it exists */}
      {errors._form && (
        <div className="rounded-md bg-red-50 p-4">
          <FormError message={errors._form} />
        </div>
      )}

      {/* Convert form data to hidden inputs for submission */}
      <input type="hidden" name="name" value={formData.name} />
      <input type="hidden" name="languages" value={JSON.stringify(formData.languages)} />
      <input type="hidden" name="topics" value={JSON.stringify(formData.topics)} />
      <input type="hidden" name="sessionsUrl" value={formData.sessionsUrl} />
      <input type="hidden" name="socialLinks" value={JSON.stringify(formData.socialLinks)} />
      {formData.avatar && <input type="hidden" name="avatar" value={formData.avatar} />}

      {/* Avatar Upload */}
      <div className="flex justify-left">
        <ImageUploadInput
          image={formData.avatar}
          onChange={({ image }) => onChange({ avatar: image })}
        />
      </div>

      <TextInput
        label="Full Name"
        value={formData.name}
        onChange={e => onChange({ name: e.target.value })}
        placeholder="Enter your full name"
        error={errors.name}
      />

      <ChipInput
        label="Languages"
        limit={8}
        values={formData.languages}
        onChange={languages => onChange({ languages })}
        placeholder="Type language and press Enter"
        error={errors.languages}
      />

      <ChipInput
        label="Topics"
        limit={10}
        values={formData.topics}
        onChange={topics => onChange({ topics })}
        placeholder="Type topic and press Enter"
        error={errors.topics}
      />

      <TextInput
        label="Link to your previous talks"
        value={formData.sessionsUrl}
        onChange={e => onChange({ sessionsUrl: e.target.value })}
        placeholder="https://youtube.com/..."
        icon={
          <Youtube
            size={18}
            className="text-[#FF0000]"
            onClick={() => onChange({ sessionsUrl: 'https://youtube.com/...' })}
          />
        }
        error={errors.sessionsUrl}
      />

      <TextareaInput
        label="Bio (optional)"
        value={formData.bio}
        onChange={e => onChange({ bio: e.target.value })}
        placeholder="Tell us about yourself, your experience, and your expertise and why you'd be a great speaker"
        error={errors.bio}
        icon={<User size={18} className="text-[#FF0000]" />}
      />
      <div className="space-y-4">
        <div className="flex flex-col">
          <Text variant="h3" size="sm" className="text-text-2">
            Social network
          </Text>
          <Text variant="p" size="sm" className="text-text-1">
            Indicate the desired communication method
          </Text>
        </div>

        {formData.socialLinks.map((social, index) => (
          <div key={index} className="space-y-2">
            <SocialNetworkInput
              value={social}
              onChange={newValue => {
                const updatedNetworks = [...formData.socialLinks];
                updatedNetworks[index] = newValue;
                onChange({ socialLinks: updatedNetworks });
              }}
            />
            {formData.socialLinks.length > 1 && (
              <Button
                type="button"
                onClick={() => onRemoveSocialNetwork(index)}
                variant="ghost"
                size="sm"
              >
                <Text variant="span" size="sm">
                  Remove
                </Text>
              </Button>
            )}
          </div>
        ))}

        {errors.socialLinks && <FormError message={errors.socialLinks} />}

        <Button type="button" onClick={onAddSocialNetwork} size="sm" variant="outline">
          <Text variant="span" size="sm">
            + Add More
          </Text>
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </Button>
    </Form>
  );
}

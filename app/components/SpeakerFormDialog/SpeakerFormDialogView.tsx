import { Camera, User, Youtube } from 'lucide-react';
import { Form } from 'react-router';
import { TextInput } from '../ui/form/TextInput';
import { SocialNetworkInput } from '../ui/form/SocialNetworkInput';
import { FormError } from '../ui/form/FormError';
import type { SpeakerFormData } from '~/lib/types';
import { TextareaInput } from '../ui/form/TextareaInput';
import { ChipInput } from '../ui/ChipInput';
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
    <Form method="post" className="space-y-6">
      {/* Show generic form error if it exists */}
      {errors._form && (
        <div className="rounded-md bg-red-50 p-4">
          <FormError message={errors._form} />
        </div>
      )}

      {/* Convert form data to hidden inputs for submission */}
      <input type="hidden" name="fullName" value={formData.fullName} />
      <input type="hidden" name="languages" value={JSON.stringify(formData.languages)} />
      <input type="hidden" name="topics" value={JSON.stringify(formData.topics)} />
      <input type="hidden" name="sessionsUrl" value={formData.sessionsUrl} />
      <input type="hidden" name="socialLinks" value={JSON.stringify(formData.socialLinks)} />
      {formData.avatar && <input type="hidden" name="avatar" value={formData.avatar} />}

      {/* Avatar Upload */}
      <div className="flex justify-left">
        <AvatarUpload avatar={formData.avatar} onChange={onChange} />
      </div>

      <TextInput
        label="Full Name"
        value={formData.fullName}
        onChange={e => onChange({ fullName: e.target.value })}
        placeholder="Enter your full name"
        error={errors.fullName}
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
        icon={<Youtube size={18} className="text-[#FF0000]" />}
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
          <h3 className="text-sm font-medium text-text-2">Social network</h3>
          <p className="text-xs text-text-1">Indicate the desired communication method</p>
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
              <button
                type="button"
                onClick={() => onRemoveSocialNetwork(index)}
                className="text-xs text-text-1 hover:text-text-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {errors.socialLinks && <FormError message={errors.socialLinks} />}

        <button
          type="button"
          onClick={onAddSocialNetwork}
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          <span>+</span> Add More
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary py-3 text-center font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>
    </Form>
  );
}

const AvatarUpload = ({
  avatar,
  onChange,
}: {
  avatar: string | undefined;
  onChange: (data: Partial<SpeakerFormData>) => void;
}) => {
  return (
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-1/30">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <Camera size={24} className="text-primary" />
        )}
      </div>
      <input
        type="file"
        id="avatar-upload"
        className={`absolute inset-0 cursor-pointer opacity-0`}
        accept="image/*"
        aria-label="Upload profile picture"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              onChange({ avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};

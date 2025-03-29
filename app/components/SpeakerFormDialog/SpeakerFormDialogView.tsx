import { Camera, Youtube } from "lucide-react"
import { TextInput } from "../ui/form/TextInput"
import { ChipInput } from "../ui/form/ChipInput"
import { SocialNetworkInput, type SocialNetwork } from "../ui/form/SocialNetworkInput"
import { FormError } from "../ui/form/FormError"

export interface SpeakerFormData {
  fullName: string
  languages: string[]
  topics: string[]
  previousTalksUrl: string
  socialNetworks: Array<{
    network: SocialNetwork
    username: string
  }>
  avatarUrl?: string
}

interface SpeakerFormDialogViewProps {
  formData: SpeakerFormData
  onChange: (data: Partial<SpeakerFormData>) => void
  onAddSocialNetwork: () => void
  onRemoveSocialNetwork: (index: number) => void
  onSubmit: () => void
  errors: Partial<Record<keyof SpeakerFormData, string>>
  isSubmitting: boolean
}

export function SpeakerFormDialogView({
  formData,
  onChange,
  onAddSocialNetwork,
  onRemoveSocialNetwork,
  onSubmit,
  errors,
  isSubmitting,
}: SpeakerFormDialogViewProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      {/* Avatar Upload */}
      <div className="flex justify-left">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-1/30">
            <Camera size={24} className="text-primary" />
          </div>
          <input
            type="file"
            id="avatar-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
            accept="image/*"
            aria-label="Upload profile picture"
          />
        </div>
      </div>

      {/* Full Name */}
      <TextInput
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
        placeholder="Enter your full name"
        error={errors.fullName}
      />

      {/* Languages */}
      <ChipInput
        label="Languages"
        limit={8}
        values={formData.languages}
        onChange={(languages) => onChange({ languages })}
        placeholder="Type language and press Enter"
        error={errors.languages}
      />

      {/* Topics */}
      <ChipInput
        label="Topics"
        limit={10}
        values={formData.topics}
        onChange={(topics) => onChange({ topics })}
        placeholder="Type topic and press Enter"
        error={errors.topics}
      />

      {/* Previous Talks URL */}
      <TextInput
        label="Link to your previous talks"
        value={formData.previousTalksUrl}
        onChange={(e) => onChange({ previousTalksUrl: e.target.value })}
        placeholder="https://youtube.com/..."
        icon={<Youtube size={18} className="text-[#FF0000]" />}
        error={errors.previousTalksUrl}
      />

      {/* Social Networks */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-text-2">Social network</h3>
          <p className="text-xs text-text-1">Indicate the desired communication method</p>
        </div>

        {formData.socialNetworks.map((social, index) => (
          <div key={index} className="space-y-2">
            <SocialNetworkInput
              value={social}
              onChange={(newValue) => {
                const updatedNetworks = [...formData.socialNetworks]
                updatedNetworks[index] = newValue
                onChange({ socialNetworks: updatedNetworks })
              }}
            />
            {formData.socialNetworks.length > 1 && (
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

        {errors.socialNetworks && <FormError message={errors.socialNetworks} />}

        <button
          type="button"
          onClick={onAddSocialNetwork}
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          <span>+</span> Add More
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary py-3 text-center font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </form>
  )
}

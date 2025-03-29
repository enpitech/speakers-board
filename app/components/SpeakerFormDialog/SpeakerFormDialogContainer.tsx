import { useState } from "react"
import { Dialog } from "../ui/Dialog/Dialog"
import { SpeakerFormDialogView } from "./SpeakerFormDialogView"
import type { SpeakerFormData } from "./SpeakerFormDialogView"

interface SpeakerFormDialogContainerProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SpeakerFormData) => Promise<void>
}

export function SpeakerFormDialogContainer({
  isOpen,
  onClose,
  onSubmit,
}: SpeakerFormDialogContainerProps) {
  const [formData, setFormData] = useState<SpeakerFormData>({
    fullName: "",
    languages: [],
    topics: [],
    previousTalksUrl: "",
    socialNetworks: [{ network: "twitter", username: "" }],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof SpeakerFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (data: Partial<SpeakerFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    // Clear errors when user makes changes
    setErrors((prev) => {
      const newErrors = { ...prev }
      Object.keys(data).forEach((key) => {
        delete newErrors[key as keyof SpeakerFormData]
      })
      return newErrors
    })
  }

  const handleAddSocialNetwork = () => {
    setFormData((prev) => ({
      ...prev,
      socialNetworks: [...prev.socialNetworks, { network: "twitter", username: "" }],
    }))
  }

  const handleRemoveSocialNetwork = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialNetworks: prev.socialNetworks.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      // Handle validation errors here if needed
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Sign up as a Speaker">
      <SpeakerFormDialogView
        formData={formData}
        onChange={handleChange}
        onAddSocialNetwork={handleAddSocialNetwork}
        onRemoveSocialNetwork={handleRemoveSocialNetwork}
        onSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </Dialog>
  )
}

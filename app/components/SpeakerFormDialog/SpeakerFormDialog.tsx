import { useState, useEffect } from "react"
import { SpeakerFormDialogView, type SpeakerFormData } from "./SpeakerFormDialogView"

interface SpeakerFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SpeakerFormData) => Promise<void>
}

export function SpeakerFormDialog({ isOpen, onClose, onSubmit }: SpeakerFormDialogProps) {
  const [formData, setFormData] = useState<SpeakerFormData>({
    fullName: "",
    languages: [],
    topics: [],
    previousTalksUrl: "",
    socialNetworks: [{ network: "twitter", username: "" }],
  })

  const [errors, setErrors] = useState<Partial<Record<keyof SpeakerFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("dialog-open")
    } else {
      document.body.classList.remove("dialog-open")
    }

    return () => {
      document.body.classList.remove("dialog-open")
    }
  }, [isOpen])

  const handleChange = (data: Partial<SpeakerFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))

    // Clear errors for changed fields
    if (data) {
      const updatedErrors = { ...errors }
      Object.keys(data).forEach((key) => {
        delete updatedErrors[key as keyof SpeakerFormData]
      })
      setErrors(updatedErrors)
    }
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SpeakerFormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (formData.languages.length === 0) {
      newErrors.languages = "At least one language is required"
    }

    if (formData.topics.length === 0) {
      newErrors.topics = "At least one topic is required"
    }

    if (formData.previousTalksUrl && !formData.previousTalksUrl.includes("youtube.com")) {
      newErrors.previousTalksUrl = "Please enter a valid YouTube URL"
    }

    const hasEmptySocialNetwork = formData.socialNetworks.some((social) => !social.username.trim())
    if (hasEmptySocialNetwork) {
      newErrors.socialNetworks = "All social network usernames are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await onSubmit(formData)
      onClose()
      // Reset form after successful submission
      setFormData({
        fullName: "",
        languages: [],
        topics: [],
        previousTalksUrl: "",
        socialNetworks: [{ network: "twitter", username: "" }],
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SpeakerFormDialogView
      isOpen={isOpen}
      onClose={onClose}
      formData={formData}
      onChange={handleChange}
      onAddSocialNetwork={handleAddSocialNetwork}
      onRemoveSocialNetwork={handleRemoveSocialNetwork}
      onSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  )
}

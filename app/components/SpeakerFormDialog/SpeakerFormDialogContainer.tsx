import { useState } from "react"
import { Dialog } from "../ui/Dialog/Dialog"
import { SpeakerFormDialogView } from "./SpeakerFormDialogView"
import type { SpeakerFormData } from "./SpeakerFormDialogView"
import { useNavigation, useActionData } from "react-router"
import React from "react"

interface SpeakerFormDialogContainerProps {
  isOpen: boolean
  onClose: () => void
}

export function SpeakerFormDialogContainer({
  isOpen,
  onClose,
}: SpeakerFormDialogContainerProps) {
  const [formData, setFormData] = useState<SpeakerFormData>({
    fullName: "",
    languages: [],
    topics: [],
    previousTalksUrl: "",
    socialNetworks: [{ network: "twitter", username: "" }],
  })


  const navigation = useNavigation();
  const actionData = useActionData<{ errors?: Record<string, string>; success?: boolean }>();
  const [errors, setErrors] = useState<Partial<Record<keyof SpeakerFormData, string>>>({...actionData?.errors})
  const isSubmitting = navigation.state === "submitting";

  // Close dialog on successful submission
  React.useEffect(() => {
    if (actionData?.success) {
      onClose();
    }
  }, [actionData?.success, onClose]);

  React.useEffect(() => {
    setErrors({...actionData?.errors})
  }, [actionData?.errors])

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

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Sign up as a Speaker">
      <SpeakerFormDialogView
        formData={formData}
        onChange={handleChange}
        onAddSocialNetwork={handleAddSocialNetwork}
        onRemoveSocialNetwork={handleRemoveSocialNetwork}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </Dialog>
  )
}

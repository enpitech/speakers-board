import React, { useState, useTransition, useOptimistic } from 'react';
import { useSubmit } from 'react-router';
import { Globe, Pencil, FileWarningIcon } from 'lucide-react';
import { ComponentErrorBoundary } from '~/components/ComponentErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TextareaInput } from '~/components/ui/form/TextareaInput';
import { Button } from '~/components/ui/button';
import { SpeakerExpertise } from './SpeakerExpertise';
import type { Speaker } from '~/lib/types';
import { Text } from './Text';

export const SpeakerPageAbout = ({ speaker }: { speaker: Speaker }) => {
  const { bio, topics, languages } = speaker;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  const [_isPending, startTransition] = useTransition();
  const [optimisticBio, setOptimisticBio] = useOptimistic(
    bio || '',
    (_state: string, newBio: string) => {
      return newBio;
    },
  );
  const submit = useSubmit();

  // onClick handler
  const handleSubmit = async (newBio: string) => {
    startTransition(async () => {
      setOptimisticBio(newBio);
      const formData = new FormData();
      formData.append('bio', newBio);
      formData.append('speakerId', speaker.id);
      await submit(formData, { method: 'post' });
    });
  };

  return (
    <div className="md:col-span-1 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Text variant="h2" size="lg">
              About
            </Text>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form className="space-y-4">
              <TextareaInput
                name="bio"
                value={editedBio}
                onChange={e => setEditedBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBio(bio);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    handleSubmit(editedBio || '');
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          ) : (
            <Text variant="p" size="sm">
              {optimisticBio}
            </Text>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Text variant="h2" size="lg">
              Expertise
            </Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ComponentErrorBoundary
            onError={error => {
              console.log('Error loading expertise', error);
            }}
            fallback={
              <div className="flex flex-col items-center gap-2 bg-red-200 p-4 rounded-lg">
                <Text variant="p" size="sm">
                  Error loading Expertise
                </Text>
                <FileWarningIcon color="red" />
              </div>
            }
          >
            <SpeakerExpertise topics={topics} />
          </ComponentErrorBoundary>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Text variant="h2" size="lg">
              Languages
            </Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {languages.map((language, index) => (
              <div key={index} className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#006699]" />
                <Text variant="p" size="sm">
                  {language}
                </Text>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { AlertTriangle } from 'lucide-react';
import type { Route } from '../+types/root';
import { Button } from './ui/button';
import { Text } from './Text';
export const GeneralError = ({ error }: Route.ErrorBoundaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background-2 rounded-lg border border-stroke">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>
        <Text variant="h2" size="lg">
          Something Went Wrong
        </Text>
        <Text variant="p" size="sm">
          An unexpected error occurred. Our team has been notified.
        </Text>
        <Text variant="p" size="sm">
          {(error as Error)?.message ?? 'Unknown error'}
        </Text>
        <div className="flex gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-white">Try Again</Button>
          <Button
            variant="outline"
            className="border-stroke text-text-2 hover:bg-background-1"
            onClick={() => (window.location.href = '/')}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

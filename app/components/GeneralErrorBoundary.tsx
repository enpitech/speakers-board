import { AlertTriangle } from 'lucide-react';
import type { Route } from '../+types/root';
import { Button } from './ui/button';

export const GeneralError = ({ error }: Route.ErrorBoundaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background-2 rounded-lg border border-stroke">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-text-2 mb-2">Something Went Wrong</h2>
        <p className="text-text-1 mb-2">
          An unexpected error occurred. Our team has been notified.
        </p>
        <p className="text-text-1 text-sm bg-background-1 p-3 rounded mb-6 w-full overflow-auto">
          {(error as Error)?.message ?? 'Unknown error'}
        </p>
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

import { WifiOff } from 'lucide-react';
import type { Route } from '../+types/root';
import { Button } from './ui/button';

export const NetworkError = ({ error }: Route.ErrorBoundaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background-1 rounded-lg border border-stroke">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <WifiOff className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-text-2 mb-2">Network Error</h2>
        <p className="text-text-1 mb-6">
          We couldn't connect to the server. Please check your internet connection and try again.
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-stroke text-text-2 hover:bg-background-2"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
};

import { Table } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/Text';
export function TableErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-background-2 rounded-lg border border-stroke">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Table className="w-8 h-8 text-primary" />
        </div>
        <Text variant="h2">Table Data Error</Text>
        <Text variant="p">
          We couldn't load the table data. This might be due to a temporary issue or the data might
          be unavailable.
        </Text>
        <div className="flex gap-4">
          <Button onClick={() => {}} className="bg-primary hover:bg-primary/90 text-white">
            Reload Data
          </Button>
        </div>
      </div>
    </div>
  );
}

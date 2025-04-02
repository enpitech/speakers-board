import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { getOptimizedPrompt } from '~/lib/fetchers/getOptimizedPrompt';
import { useFetcher, type ActionFunctionArgs } from 'react-router';
import { useState } from 'react';
import { Text } from '~/components/Text';
import { Copy, CopyPlusIcon } from 'lucide-react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const prompt = formData.get('prompt');
  const optimizedPrompt = await getOptimizedPrompt(prompt as string);
  return { optimizedPrompt };
};

export default function PromptOptimizerPage() {
  const formFetcher = useFetcher<typeof action>();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formFetcher.submit(formData, { method: 'POST' });
  };

  return (
    <div className="container mx-auto p-12 md:px-6">
      <OptimizerForm handleFormSubmit={handleFormSubmit} />
      {formFetcher.state === 'submitting' && <div>Submitting...</div>}
      {formFetcher.state === 'idle' && formFetcher.data?.optimizedPrompt && (
        <OptimizedPromptOutput optimizedPrompt={formFetcher?.data?.optimizedPrompt ?? 'sadas'} />
      )}
    </div>
  );
}
const OptimizedPromptOutput = ({ optimizedPrompt }: { optimizedPrompt: string }) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <Button
        className="absolute top-0 right-0  shadow-sm rounded-full"
        onClick={() => {
          navigator.clipboard.writeText(optimizedPrompt);
        }}
      >
        Copy to clipboard
      </Button>
      <Text className="w-full whitespace-pre-wrap">{optimizedPrompt}</Text>
    </div>
  );
};

const AutoCompleteInputForm = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="prompt">Explain what you want to generate</label>
        <Textarea
          name="prompt"
          className="min-h-96 w-full min-w-96"
          value={value}
          onChange={e => setValue(e.target.value)}
          id="prompt"
          rows={30}
          placeholder="Generate prompt for code generation tailord for this project "
        />
      </div>
      <Button type="submit">Generate</Button>
    </>
  );
};

const OptimizerForm = ({
  handleFormSubmit,
}: {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <AutoCompleteInputForm />
      </div>
    </form>
  );
};

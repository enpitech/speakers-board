import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { getAutoComplete, getOptimizedPrompt } from '~/lib/fetchers/getOptimizedPrompt';
import {
  useFetcher,
  type ActionFunctionArgs,
  type FetcherWithComponents,
  type LoaderFunctionArgs,
  useSearchParams,
} from 'react-router';
import { use, useState } from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const prompt = formData.get('prompt');
  const optimizedPrompt = await getOptimizedPrompt(prompt as string);
  return { optimizedPrompt };
};

export async function loader({ request }: LoaderFunctionArgs) {
  //   const url = new URL(request.url);
  //   const prompt = url.searchParams.get('prompt');
  //   const optimizedPrompt = getOptimizedPromptStreamGenerator(prompt as string);
  //   const optimizedPrompt = fetchOptimizedPromptHandler(await request.formData());
  //   return { optimizedPrompt };
}

export default function PromptOptimizerPage() {
  const formFetcher = useFetcher<typeof action>();
  const autoCompleteFetcher = useFetcher<typeof autoCompleteAction>();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formFetcher.submit(formData, { method: 'POST' });
  };

  return (
    <div className="container mx-auto p-12 md:px-6">
      <OptimizerForm
        formFetcher={formFetcher}
        autoCompleteFetcher={autoCompleteFetcher}
        handleFormSubmit={handleFormSubmit}
      />
      {formFetcher.state === 'submitting' && <div>Submitting...</div>}
      {formFetcher.state === 'idle' && formFetcher.data?.optimizedPrompt && (
        <OptimizedPrompt optimizedPrompt={formFetcher.data.optimizedPrompt} />
      )}
    </div>
  );
}
const OptimizedPrompt = ({ optimizedPrompt }: { optimizedPrompt: string }) => {
  return <div>{optimizedPrompt}</div>;
};

////////////////////////////////////////////////////////////

const AutoCompleteInputForm = ({
  fetcher,
  storageKey = 'auto-complete-input',
}: {
  fetcher: FetcherWithComponents<{
    autoComplete: string;
  }>;
  storageKey: string;
}) => {
  //   const { value: promptInput, setValue: setPromptInput } = useLocalStorage(storageKey, '');

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
  formFetcher,
  autoCompleteFetcher,
  handleFormSubmit,
}: {
  formFetcher: FetcherWithComponents<{
    optimizedPrompt: string;
  }>;
  autoCompleteFetcher: FetcherWithComponents<{
    autoComplete: string;
  }>;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const handleAutoCompleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    autoCompleteFetcher.submit(formData, { method: 'POST' });
  };
  const searchParams = useSearchParams();
  //   useEffect(() => {
  //     if (autoCompleteFetcher.data?.autoComplete) {
  //       formFetcher.submit(
  //         { optimizedPrompt: autoCompleteFetcher.data.autoComplete },
  //         { method: 'POST' },
  //       );
  //     }
  //   }, []);
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <AutoCompleteInputForm fetcher={autoCompleteFetcher} storageKey="auto-complete-input" />
      </div>
      {/* {formFetcher.data?.optimizedPrompt && (
        <div className="flex flex-col gap-2">
          <label htmlFor="optimizedPrompt">Optimized Prompt</label>
          <Textarea
            name="optimizedPrompt"
            id="optimizedPrompt"
          />
        </div>
      )} */}
    </form>
  );
};

const fetchOptimizedPromptHandler = async (formData: FormData) => {
  const prompt = formData.get('prompt');
  const optimizedPrompt = await getOptimizedPrompt(prompt as string);
  return optimizedPrompt;
};
export const autoCompleteAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const prompt = formData.get('prompt');
  const autoComplete = await getAutoComplete(prompt as string);
  return { autoComplete };
};

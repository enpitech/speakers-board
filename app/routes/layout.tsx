import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { RegisterSpeakerButton } from '~/components/RegisterSpeakerButton';
import { SpeakerFormDialogContainer } from '~/components/SpeakerFormDialogContainer';
import { Button } from '~/components/ui/button';

export default function Layout() {
  const [registerSpeakerDialogOpen, setRegisterSpeakerDialogOpen] = useState(false);
  const handleRegisterSpeakerDialogClose = () => {
    setRegisterSpeakerDialogOpen(false);
  };
  const handleRegisterSpeakerDialogOpen = () => {
    setRegisterSpeakerDialogOpen(true);
  };
  return (
    <div className="flex flex-col min-h-screen p-4 items-center justify-start bg-background">
      <header className="w-full flex items-center justify-between">
        <Link to="/speakers">
          <img src="/logoIcon.svg" alt="logo" className="w-40 h-16" />
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/speakers">
            <Button variant="outline">Speakers</Button>
          </Link>
          <Link to="/prompt-optimizer">
            <Button variant="outline">Prompt Optimizer</Button>
          </Link>
          <RegisterSpeakerButton onClick={handleRegisterSpeakerDialogOpen} />
        </div>
      </header>
      <main className="py-2 w-full">
        <Outlet />
      </main>
      {registerSpeakerDialogOpen && (
        <div className="fixed inset-0 z-50">
          <SpeakerFormDialogContainer
            isOpen={registerSpeakerDialogOpen}
            onClose={handleRegisterSpeakerDialogClose}
          />
        </div>
      )}
    </div>
  );
}

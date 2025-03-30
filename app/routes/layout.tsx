import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-4 items-center justify-start bg-background">
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}

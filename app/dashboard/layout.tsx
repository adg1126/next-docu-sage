import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { getLoggedInUser } from '@/lib/actions/userActions';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser?.$id) redirect('/');

  return (
    <main className='min-h-screen font-sans antialiased grainy'>
      <Navbar />
      <Toaster />
      {children}
    </main>
  );
}

import Navbar from '@/components/Navbar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen font-sans antialiased grainy'>
      <Navbar />
      {children}
    </main>
  );
}

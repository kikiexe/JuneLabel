import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 xl:pt-20 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

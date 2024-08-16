import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800 hover:text-gray-600">
            Pengajuan Kredit
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/approval" className="text-gray-600 hover:text-gray-800">
              Approval
            </Link>
          </div>
        </div>
      </nav>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

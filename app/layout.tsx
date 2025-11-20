import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Ayurvedic Drug Discovery Agent',
  description:
    'Ingest Ayurvedic sources and phytochemical data to predict targets and disease associations.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-7xl px-4">
          <header className="py-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Ayurvedic Drug Discovery Agent
            </h1>
            <p className="text-slate-600">
              Ingest ? Extract ? Normalize ? Predict ? Rank ? Report
            </p>
          </header>
          <main className="pb-12">{children}</main>
          <footer className="border-t py-6 text-sm text-slate-500">
            Built for research and educational purposes.
          </footer>
        </div>
      </body>
    </html>
  );
}

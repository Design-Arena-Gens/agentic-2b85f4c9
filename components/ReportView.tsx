'use client';
import { marked } from 'marked';
import { useAppStore } from '@/lib/store';
import { useMemo } from 'react';

export default function ReportView() {
  const report = useAppStore((s) => s.report);
  const html = useMemo(() => marked.parse(report || '# No report yet'), [report]);
  const onDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.md';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Report</h3>
        <button className="btn" onClick={onDownload} disabled={!report}>
          Download Markdown
        </button>
      </div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html as string }}
      />
    </div>
  );
}

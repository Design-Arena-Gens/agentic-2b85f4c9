'use client';
import { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function UploadArea() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const setRawTexts = useAppStore((s) => s.setRawTexts);
  const addCSV = useAppStore((s) => s.addCSV);
  const [textValue, setTextValue] = useState('');

  const onAddText = () => {
    const v = (textareaRef.current?.value ?? '').trim();
    if (!v) return;
    setRawTexts([v]);
  };
  const onLoadSample = async () => {
    const res = await fetch('/samples/charaka_excerpt.txt');
    const txt = await res.text();
    setTextValue(txt);
    setRawTexts([txt]);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    addCSV(file.name, content);
  };

  return (
    <div className="card space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Paste text</label>
        <textarea
          ref={textareaRef}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Paste Ayurvedic excerpt, abstracts, or notes..."
          rows={6}
          className="input h-auto"
        />
        <div className="mt-2">
          <button onClick={onAddText} className="btn btn-primary">
            Add Text
          </button>
          <button onClick={onLoadSample} className="btn ml-2">Load Sample</button>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Upload CSV (optional)</label>
        <input type="file" accept=".csv,text/csv" onChange={onFile} className="block" />
        <p className="mt-1 text-xs text-slate-500">
          CSV should include a column named <code>text</code> or <code>abstract</code>.
        </p>
      </div>
    </div>
  );
}

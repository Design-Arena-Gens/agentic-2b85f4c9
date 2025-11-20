'use client';
import { useAppStore } from '@/lib/store';

export default function PipelineControls() {
  const execute = useAppStore((s) => s.execute);
  const clear = useAppStore((s) => s.clearData);
  const isRunning = useAppStore((s) => s.isRunning);
  const error = useAppStore((s) => s.error);
  const ranked = useAppStore((s) => s.ranked);

  return (
    <div className="card flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button disabled={isRunning} onClick={execute} className="btn btn-primary">
          {isRunning ? 'Running?' : 'Run Pipeline'}
        </button>
        <button disabled={isRunning} onClick={clear} className="btn">
          Clear
        </button>
      </div>
      <div className="text-sm text-slate-600">
        {ranked.length > 0 ? `${ranked.length} candidates` : 'No results yet'}
      </div>
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}

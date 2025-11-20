'use client';
import { useAppStore } from '@/lib/store';

export default function ResultsTable() {
  const ranked = useAppStore((s) => s.ranked);
  const graph = useAppStore((s) => s.graph);
  if (!graph || ranked.length === 0) {
    return <div className="card">Run the pipeline to see ranked candidates.</div>;
  }
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-2">#</th>
            <th className="p-2">Compound</th>
            <th className="p-2">Disease</th>
            <th className="p-2">Score</th>
            <th className="p-2">Rationale</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((r, idx) => (
            <tr key={`${r.compoundId}-${r.diseaseId}`} className="border-t">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{graph.entities[r.compoundId]?.name ?? r.compoundId}</td>
              <td className="p-2">{graph.entities[r.diseaseId]?.name ?? r.diseaseId}</td>
              <td className="p-2">{r.score.toFixed(3)}</td>
              <td className="p-2">
                <ul className="list-disc pl-5">
                  {r.rationale.slice(0, 4).map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

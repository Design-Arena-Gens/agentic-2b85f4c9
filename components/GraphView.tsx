'use client';
import { useEffect, useMemo, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export default function GraphView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graph = useAppStore((s) => s.graph);
  const data = useMemo(() => {
    if (!graph) return { nodes: [], edges: [] };
    const nodes = Object.values(graph.entities).map((e) => ({
      id: e.id,
      label: `${e.name}\n(${e.type})`,
      group: e.type
    }));
    const edges = Object.values(graph.relations).map((r) => ({
      id: r.id,
      from: r.sourceId,
      to: r.targetId,
      label: r.type
    }));
    return { nodes, edges };
  }, [graph]);

  useEffect(() => {
    let network: any;
    async function init() {
      if (!containerRef.current || !graph) return;
      const vis = await import('vis-network');
      const { Network } = vis;
      const nodes = new vis.DataSet(data.nodes as any);
      const edges = new vis.DataSet(data.edges as any);
      const options = {
        physics: { stabilization: true },
        edges: { arrows: 'to', smooth: { type: 'dynamic' } },
        layout: { improvedLayout: true }
      } as any;
      network = new Network(
        containerRef.current,
        { nodes: nodes as any, edges: edges as any } as any,
        options as any
      );
      // Resize on container changes
      setTimeout(() => network?.fit?.(), 100);
    }
    init();
    return () => {
      if (network?.destroy) network.destroy();
    };
  }, [data, graph]);

  if (!graph) return <div className="card">Graph will appear after running the pipeline.</div>;
  return <div className="card h-[500px]"><div ref={containerRef} className="h-[460px]" /></div>;
}

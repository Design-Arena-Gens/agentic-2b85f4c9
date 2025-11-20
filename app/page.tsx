import UploadArea from '@/components/UploadArea';
import PipelineControls from '@/components/PipelineControls';
import ResultsTable from '@/components/ResultsTable';
import GraphView from '@/components/GraphView';
import ReportView from '@/components/ReportView';

export default function Page() {
  return (
    <div className="space-y-6">
      <UploadArea />
      <PipelineControls />
      <ResultsTable />
      <GraphView />
      <ReportView />
    </div>
  );
}

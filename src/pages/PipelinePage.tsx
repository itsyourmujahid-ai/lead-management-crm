import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function PipelinePage() {
  const stages = [
    'New',
    'Contacted',
    'Interested',
    'Meeting',
    'Quotation',
    'Negotiation',
    'Won',
    'Lost',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Pipeline</h1>
        <p className="text-slate-500 mt-1">Visualize your sales pipeline</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <Card key={stage}>
            <CardHeader>
              <CardTitle className="text-sm">{stage}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-400">No leads</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

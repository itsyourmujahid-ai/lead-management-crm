import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
        <p className="text-slate-500 mt-1">Manage all your sales leads</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No leads yet</p>
            <p className="text-slate-400 mt-1">Create your first lead to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

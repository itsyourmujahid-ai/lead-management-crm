import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function FollowUpsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Follow-ups</h1>
        <p className="text-slate-500 mt-1">Manage your scheduled follow-ups</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No follow-ups scheduled for today</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overdue Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No overdue follow-ups</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

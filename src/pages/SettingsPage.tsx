import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your CRM preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Organization Name</label>
              <input
                type="text"
                placeholder="Your company name"
                className="mt-1 px-3 py-2 border border-slate-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-1 px-3 py-2 border border-slate-300 rounded-lg w-full"
              />
            </div>
            <Button variant="primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-500">Configure custom lead types and categories</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import {
  LoginPage,
  DashboardPage,
  LeadsPage,
  PipelinePage,
  FollowUpsPage,
  ReportsPage,
  SettingsPage,
} from '@/pages';
import { AddLeadModal } from '@/components/modals/AddLeadModal';

export function App() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAddLead, setShowAddLead] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'leads':
        return <LeadsPage />;
      case 'pipeline':
        return <PipelinePage />;
      case 'followups':
        return <FollowUpsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <AppLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onAddLead={() => setShowAddLead(true)}
      >
        {renderPage()}
      </AppLayout>
      <AddLeadModal
        open={showAddLead}
        onOpenChange={setShowAddLead}
      />
    </>
  );
}

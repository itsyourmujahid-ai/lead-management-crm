import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { Plus, LogOut } from 'lucide-react';

interface AppHeaderProps {
  onAddLead: () => void;
}

export function AppHeader({ onAddLead }: AppHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">CRM</h1>
        <p className="text-sm text-slate-500">Lead Management System</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="primary" size="md" onClick={onAddLead}>
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{user?.email}</p>
            <p className="text-xs text-slate-500">User</p>
          </div>
          <button
            onClick={logout}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

interface SidebarProps {
  activeSection?: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection = 'dashboard', onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
    { id: 'followups', label: 'Follow-ups', icon: '📋' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            activeSection === item.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg mr-2">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

interface AppLayoutProps {
  children: ReactNode;
  activeSection?: string;
  onSectionChange: (section: string) => void;
  onAddLead: () => void;
}

export function AppLayout({
  children,
  activeSection = 'dashboard',
  onSectionChange,
  onAddLead,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <AppHeader onAddLead={onAddLead} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

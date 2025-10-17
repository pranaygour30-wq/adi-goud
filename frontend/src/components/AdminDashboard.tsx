import { useState } from 'react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminNavbar } from './admin/AdminNavbar';
import { DashboardOverview } from './admin/DashboardOverview';
import { MembersManagement } from './admin/MembersManagement';
import { EventsManagement } from './admin/EventsManagement';
import { GalleryManagement } from './admin/GalleryManagement';
import { AnnouncementsManagement } from './admin/AnnouncementsManagement';
import { SettingsPage } from './admin/SettingsPage';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState('overview');

  const handleLogout = () => {
    onNavigate('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'members':
        return <MembersManagement />;
      case 'events':
        return <EventsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'announcements':
        return <AnnouncementsManagement />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onLogout={handleLogout} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

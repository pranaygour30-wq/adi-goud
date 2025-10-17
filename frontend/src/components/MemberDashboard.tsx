import { useState, useEffect } from 'react';
import { MemberSidebar } from './member/MemberSidebar';
import { MemberNavbar } from './member/MemberNavbar';
import { UserProfilePage } from './member/UserProfilePage';
import { MembersPage } from './member/MembersPage';
import { MemberDetailPage } from './member/MemberDetailPage';
import { EventsPage } from './member/EventsPage';
import { GalleryPage } from './member/GalleryPage';
import { BirthdaysPage } from './member/BirthdaysPage';
import { AnniversariesPage } from './member/AnniversariesPage';
import { SabhaBearersPage } from './member/SabhaBearersPage';
import { RedClubPage } from './member/RedClubPage';
import { AboutPage } from './member/AboutPage';

interface MemberDashboardProps {
  onNavigate: (page: string) => void;
}

export function MemberDashboard({ onNavigate }: MemberDashboardProps) {
  const [currentView, setCurrentView] = useState('profile');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState<string>('Member');

  useEffect(() => {
    const name = localStorage.getItem('memberName');
    if (name) setMemberName(name);
  }, []);

  const handleViewMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setCurrentView('member-detail');
  };

  const handleBackToMembers = () => {
    setSelectedMemberId(null);
    setCurrentView('members');
  };

  const handleLogout = () => {
    localStorage.removeItem('memberEmail');
    localStorage.removeItem('memberName');
    onNavigate('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfilePage onNavigate={setCurrentView} />;
      case 'members':
        return <MembersPage onViewMember={handleViewMember} />;
      case 'member-detail':
        return selectedMemberId ? (
          <MemberDetailPage memberId={selectedMemberId} onBack={handleBackToMembers} />
        ) : (
          <MembersPage onViewMember={handleViewMember} />
        );
      case 'events':
        return <EventsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'birthdays':
        return (
          <div className="space-y-8">
            <BirthdaysPage />
            <AnniversariesPage />
          </div>
        );
      case 'sabha-bearers':
        return <SabhaBearersPage />;
      case 'red-club':
        return <RedClubPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <UserProfilePage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <MemberSidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <MemberNavbar memberName={memberName} onLogout={handleLogout} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

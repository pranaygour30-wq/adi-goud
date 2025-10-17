import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { MemberDashboard } from './components/MemberDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactPage } from './components/ContactPage';

type Page = 'home' | 'login' | 'member-dashboard' | 'admin-dashboard' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'member-dashboard':
        return <MemberDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Don't show navbar/footer on dashboard pages
  const showNavbarFooter = currentPage !== 'member-dashboard' && currentPage !== 'admin-dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarFooter && <Navbar onNavigate={handleNavigate} currentPage={currentPage} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showNavbarFooter && <Footer />}
    </div>
  );
}

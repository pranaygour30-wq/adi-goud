import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Image, 
  Cake, 
  Heart, 
  Trophy,
  Building2,
  UserCircle,
  Info,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface MemberSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function MemberSidebar({ currentView, onNavigate, onLogout }: MemberSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'profile', label: 'My Profile', icon: UserCircle },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'sabha-bearers', label: 'Office Bearers', icon: Building2 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'red-club', label: 'Red Club', icon: Trophy },
    { id: 'birthdays', label: 'Birthdays & Anniversaries', icon: Cake },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-border z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white">ॐ</span>
            </div>
            <div>
              <h3 className="text-primary">AGBM</h3>
              <p className="text-xs text-muted-foreground">Member Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full gap-2 text-destructive border-destructive hover:bg-destructive hover:text-white"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

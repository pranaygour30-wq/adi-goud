import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface MemberNavbarProps {
  memberName: string;
  onLogout: () => void;
}

export function MemberNavbar({ memberName, onLogout }: MemberNavbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Page Title */}
        <div className="hidden sm:block">
          <h2 className="text-primary">Member Portal</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-white text-xs">
              5
            </Badge>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                  {memberName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm">{memberName}</p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

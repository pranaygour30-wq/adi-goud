import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface MemberCardProps {
  name: string;
  location: string;
  phone?: string;
  email?: string;
  caste?: string;
  memberSince?: string;
}

export function MemberCard({ name, location, phone, email, caste, memberSince }: MemberCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="text-foreground mb-1">{name}</h4>
            {caste && (
              <Badge className="bg-secondary text-secondary-foreground mb-2">{caste}</Badge>
            )}
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
              )}
            </div>
            {memberSince && (
              <p className="text-xs text-muted-foreground mt-2">Member since {memberSince}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

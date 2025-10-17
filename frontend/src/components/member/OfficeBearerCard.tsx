import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Phone, Mail } from 'lucide-react';

interface OfficeBearerCardProps {
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  tenure?: string;
  isPast?: boolean;
}

export function OfficeBearerCard({ name, designation, phone, email, tenure, isPast = false }: OfficeBearerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-foreground mb-2">{name}</h4>
        <Badge className="bg-primary text-primary-foreground mb-3">{designation}</Badge>
        {tenure && (
          <p className="text-sm text-muted-foreground mb-3">
            {isPast ? `Tenure: ${tenure}` : `Since ${tenure}`}
          </p>
        )}
        <div className="space-y-2 text-sm text-muted-foreground">
          {phone && (
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

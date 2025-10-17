import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Cake, Calendar, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import * as api from '../../lib/api';

interface Member {
  _id: string;
  Name: string;
  DOB: string;
  Phone: string;
  Address?: string;
}

export function BirthdaysPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        const data = await api.birthdays();
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching birthdays:', err);
        setError('Failed to load upcoming birthdays. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Happy Birthday ${name}! 🎂🎉 Wishing you a wonderful year ahead filled with joy and success!`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const getRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString();
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <Cake className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-primary">Upcoming Birthdays</h2>
          <p className="text-muted-foreground">Celebrate with our community members</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading birthdays...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {/* Birthday List */}
      {!loading && !error && (
        <div className="space-y-4">
          {members.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No upcoming birthdays in the next 30 days.
              </CardContent>
            </Card>
          ) : (
            members.map((member) => (
              <Card key={member._id} className={`${isToday(member.DOB) ? 'border-2 border-primary' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {member.Name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground">{member.Name}</h4>
                        {isToday(member.DOB) && (
                          <Badge className="bg-primary text-primary-foreground animate-pulse">
                            Today! 🎉
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{getRelativeDate(member.DOB)}</span>
                        </div>
                        {member.Address && (
                          <>
                            <span>•</span>
                            <span>{member.Address}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsApp(member.Phone, member.Name);
                      }}
                      size="sm" 
                      className="hidden sm:flex gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

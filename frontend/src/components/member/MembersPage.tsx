import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface MembersPageProps {
  onViewMember: (memberId: string) => void;
}

export function MembersPage({ onViewMember }: MembersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { api } = await import('../../lib/api');
        const data = await api.members();
        if (mounted) setMembers(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load members');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredMembers = members.filter((member) => {
    const name = (member.Name || '').toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-primary">Community Members</h2>
        <p className="text-muted-foreground">Connect with fellow community members</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      {loading && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading members...</p>
        </Card>
      )}
      {error && (
        <Card className="p-12 text-center">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card 
            key={member._id} 
            className="hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onViewMember(member._id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4 border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
                    {(member.Name || '').split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-foreground mb-2">{member.Name}</h4>
                <Badge className="bg-secondary text-secondary-foreground mb-3">{member.Occupation || 'Member'}</Badge>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{member.Email}</p>
                  {member['Blood Group'] && (
                    <p className="text-xs">Blood Group: {member['Blood Group']}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && !error && filteredMembers.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No members found matching your search criteria.</p>
        </Card>
      )}
    </div>
  );
}

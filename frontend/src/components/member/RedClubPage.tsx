import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Droplet, Phone, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { api } from '../../lib/api';

interface Member {
  _id: string;
  Name: string;
  Phone: string;
  'Blood Group': string;
}

export function RedClubPage() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Blood group statistics - will be updated with real data
  const [bloodGroups, setBloodGroups] = useState([
    { type: 'O+', count: 0, color: 'from-lime-500 to-lime-600' },
  ]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await api.redClub();
        setMembers(data);
        
        // Update blood group count
        setBloodGroups([
          { type: 'O+', count: data.length, color: 'from-lime-500 to-lime-600' },
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError('Failed to load members. Please try again later.');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading members...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  if (selectedBloodGroup) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setSelectedBloodGroup(null)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blood Groups
        </Button>

        {/* Header */}
        <div>
          <h2 className="text-primary">Blood Group {selectedBloodGroup}</h2>
          <p className="text-muted-foreground">{members.length} members available</p>
        </div>

        {/* Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-destructive/20">
                    <AvatarFallback className="bg-gradient-to-br from-destructive to-red-600 text-white">
                      {member.Name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-foreground mb-2">{member.Name}</h4>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                        <a href={`tel:${member.Phone}`} className="hover:text-primary">
                          {member.Phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplet className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{member['Blood Group']}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-destructive to-red-600 rounded-full flex items-center justify-center">
          <Droplet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-primary">Red Club - Blood Donors Directory</h2>
          <p className="text-muted-foreground">Find blood donors in our community</p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-destructive/20">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            The Red Club maintains a directory of community members willing to donate blood in case of emergency. 
            Click on any blood group below to view available donors with their contact information.
          </p>
        </CardContent>
      </Card>

      {/* Blood Group Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {bloodGroups.map((group) => (
          <Card 
            key={group.type}
            className="cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={() => setSelectedBloodGroup(group.type)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Droplet className="w-8 h-8 text-white fill-white" />
              </div>
              <h2 className="text-foreground mb-1">{group.type}</h2>
              <p className="text-sm text-muted-foreground">{group.count} donors</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

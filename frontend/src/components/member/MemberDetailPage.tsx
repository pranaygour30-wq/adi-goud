import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Droplet, User, MessageCircle } from 'lucide-react';
import { Separator } from '../ui/separator';

interface MemberDetailPageProps {
  memberId: number;
  onBack: () => void;
}

export function MemberDetailPage({ memberId, onBack }: MemberDetailPageProps) {
  // Mock data - in real app would fetch based on memberId
  const member = {
    id: memberId,
    name: 'Suresh Reddy',
    email: 'suresh.r@example.com',
    phone: '+91 9876543211',
    dateOfBirth: '1975-08-22',
    bloodGroup: 'A+',
    address: '456, Banjara Hills Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    occupation: 'Software Engineer',
    caste: 'Adi Goud',
    memberSince: '2019',
    familyMembers: [
      { name: 'Padma Reddy', relation: 'Spouse', age: 42 },
      { name: 'Kiran Reddy', relation: 'Son', age: 18 },
    ],
  };

  const handleWhatsApp = () => {
    const phone = member.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Members
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-foreground mb-1">{member.name}</h3>
            <p className="text-muted-foreground mb-2">{member.occupation}</p>
            <Badge className="bg-secondary text-secondary-foreground mb-4">{member.caste}</Badge>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Droplet className="w-4 h-4 text-destructive" />
                <span>Blood Group: <strong className="text-foreground">{member.bloodGroup}</strong></span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(member.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Member since {member.memberSince}</p>
            <Button onClick={handleWhatsApp} className="w-full gap-2 bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4" />
              Contact on WhatsApp
            </Button>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">{member.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">{member.phone}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground">
                    {member.address}<br />
                    {member.city}, {member.state} - {member.pincode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                  <p className="text-foreground">{new Date(member.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Blood Group</p>
                  <p className="text-foreground">{member.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Occupation</p>
                  <p className="text-foreground">{member.occupation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Community</p>
                  <p className="text-foreground">{member.caste}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle>Family Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {member.familyMembers.map((familyMember, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4 py-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-foreground">{familyMember.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {familyMember.relation} • {familyMember.age} years
                        </p>
                      </div>
                    </div>
                    {index < member.familyMembers.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

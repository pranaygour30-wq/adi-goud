import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Edit, Users, Mail, Phone, MapPin, Calendar, Droplet, User } from 'lucide-react';
import { Separator } from '../ui/separator';

interface UserProfilePageProps {
  onNavigate: (view: string) => void;
}

export function UserProfilePage({ onNavigate }: UserProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '1980-05-15',
    bloodGroup: 'O+',
    address: '123, MG Road, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    occupation: 'Business Owner',
    familyMembers: [
      { name: 'Lakshmi Kumar', relation: 'Spouse', age: 38 },
      { name: 'Arjun Kumar', relation: 'Son', age: 15 },
      { name: 'Anjali Kumar', relation: 'Daughter', age: 12 },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    // Mock save - in real app would save to backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button variant="outline" onClick={() => onNavigate('members')} className="gap-2">
                <Users className="w-4 h-4" />
                View Other Members
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-foreground mb-1">{profile.name}</h3>
            <p className="text-muted-foreground mb-4">{profile.occupation}</p>
            <Badge className="bg-green-100 text-green-800 mb-4">✓ Verified Member</Badge>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Droplet className="w-4 h-4 text-destructive" />
                <span>Blood Group: <strong className="text-foreground">{profile.bloodGroup}</strong></span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood">Blood Group</Label>
                  <select
                    id="blood"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input-background disabled:opacity-50"
                    value={profile.bloodGroup}
                    onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                    disabled={!isEditing}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    className="pl-10"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={profile.pincode}
                    onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                    disabled={!isEditing}
                  />
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
                {profile.familyMembers.map((member, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4 py-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.relation} • {member.age} years
                        </p>
                      </div>
                    </div>
                    {index < profile.familyMembers.length - 1 && <Separator />}
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

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Calendar, Users, Cake, Heart, Bell, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

export function DashboardHome() {
  const quickStats = [
    { icon: Users, label: 'Total Members', value: '2,547', color: 'bg-blue-100 text-blue-800' },
    { icon: Calendar, label: 'Upcoming Events', value: '8', color: 'bg-green-100 text-green-800' },
    { icon: Cake, label: 'Birthdays This Month', value: '24', color: 'bg-purple-100 text-purple-800' },
    { icon: Heart, label: 'Anniversaries', value: '12', color: 'bg-pink-100 text-pink-800' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Annual Sammelan 2025', date: 'Mar 15, 2025', location: 'Hyderabad' },
    { id: 2, title: 'Cultural Workshop', date: 'Mar 22, 2025', location: 'Online' },
    { id: 3, title: 'Youth Connect', date: 'Apr 5, 2025', location: 'Bangalore' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'New Website Launch', time: '2 hours ago' },
    { id: 2, title: 'Monthly Newsletter Available', time: '1 day ago' },
    { id: 3, title: 'Member Directory Update', time: '3 days ago' },
  ];

  const upcomingBirthdays = [
    { id: 1, name: 'Rajesh Kumar', date: 'Mar 15' },
    { id: 2, name: 'Lakshmi Devi', date: 'Mar 18' },
    { id: 3, name: 'Suresh Reddy', date: 'Mar 20' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarFallback className="bg-white text-primary text-xl">
                RK
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white mb-1">Welcome back, Rajesh Kumar!</h2>
              <p className="text-orange-100">Member since 2020 • Hyderabad</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h2 className="text-foreground">{stat.value}</h2>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground mb-1">{event.title}</h4>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Register</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="pb-3 border-b last:border-0">
                <h4 className="text-foreground mb-1 text-sm">{announcement.title}</h4>
                <p className="text-xs text-muted-foreground">{announcement.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Birthdays Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cake className="w-5 h-5" />
              Upcoming Birthdays
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingBirthdays.map((birthday) => (
              <div key={birthday.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {birthday.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground text-sm">{birthday.name}</h4>
                  <p className="text-xs text-muted-foreground">{birthday.date}</p>
                </div>
                <Cake className="w-4 h-4 text-primary" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

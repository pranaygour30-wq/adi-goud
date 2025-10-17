import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Search } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function EventsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Festival',
  });

  const events = [
    {
      id: 1,
      title: 'Annual Sammelan 2025',
      date: '2025-03-15',
      location: 'Community Hall, Hyderabad',
      attendees: 245,
      category: 'Festival',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYwMjAyMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'Cultural Heritage Workshop',
      date: '2025-03-22',
      location: 'Online Event',
      attendees: 156,
      category: 'Workshop',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1604522358494-b6f7c67b6c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdWx0dXJhbCUyMGRhbmNlfGVufDF8fHx8MTc2MDIwMjIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'Youth Connect Program',
      date: '2025-04-05',
      location: 'Community Center, Bangalore',
      attendees: 89,
      category: 'Social',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1606305011336-813aec29c8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjAyMDIyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 4,
      title: 'Diwali Celebration 2024',
      date: '2024-11-12',
      location: 'Main Hall, Mumbai',
      attendees: 512,
      category: 'Festival',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYwMjAyMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create event:', newEvent);
    setIsAddModalOpen(false);
    setNewEvent({ title: '', date: '', location: '', description: '', category: 'Festival' });
  };

  const handleEdit = (id: number) => {
    console.log('Edit event:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete event:', id);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">Events Management</h2>
          <p className="text-muted-foreground">Create and manage community events</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Fill in the event details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  placeholder="Enter location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-category">Category</Label>
                <select
                  id="event-category"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                >
                  <option value="Festival">Festival</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Social">Social</option>
                  <option value="Educational">Educational</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Create Event</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-foreground line-clamp-2">{event.title}</h4>
                <Badge className="bg-accent text-accent-foreground shrink-0">{event.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} registered</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    event.status === 'upcoming'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {event.status}
                </Badge>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(event.id)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-red-50"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

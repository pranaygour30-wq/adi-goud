import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { api } = await import('../../lib/api');
        const data = await api.events();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Split events into upcoming and past based on date
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  });

  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-primary">Events</h2>
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-primary">Events</h2>
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  const renderEventCard = (event: any, isUpcoming: boolean) => (
    <Card key={event._id || event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] overflow-hidden bg-secondary">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-foreground flex-1">{event.title}</h4>
          <Badge className="bg-accent text-accent-foreground shrink-0">{event.category || 'Event'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{event.attendees} Attendees</span>
            </div>
          )}
        </div>
        {isUpcoming && (
          <Button className="w-full">Register</Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary">Events</h2>
        <p className="text-muted-foreground">Upcoming and past events of our community</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => renderEventCard(event, true))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No upcoming events scheduled.</p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map(event => renderEventCard(event, false))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No past events found.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

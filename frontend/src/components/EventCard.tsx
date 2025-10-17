import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
}

export function EventCard({ title, date, location, attendees, image, category }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] overflow-hidden bg-secondary">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-foreground line-clamp-2">{title}</h4>
          <Badge className="bg-accent text-accent-foreground shrink-0">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Users className="w-4 h-4" />
          <span>{attendees} registered</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Register</Button>
      </CardFooter>
    </Card>
  );
}

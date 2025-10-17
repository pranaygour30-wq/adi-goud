import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Megaphone, Search } from 'lucide-react';

export function AnnouncementsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'normal',
  });

  const announcements = [
    {
      id: 1,
      title: 'New Website Launch',
      message: 'We are excited to announce the launch of our new community website with enhanced features!',
      date: '2025-03-10',
      priority: 'high',
      status: 'active',
    },
    {
      id: 2,
      title: 'Monthly Newsletter Available',
      message: 'Read our latest newsletter featuring community updates, upcoming events, and member highlights.',
      date: '2025-03-08',
      priority: 'normal',
      status: 'active',
    },
    {
      id: 3,
      title: 'Member Directory Update',
      message: 'Please update your profile information to be included in the latest member directory.',
      date: '2025-03-05',
      priority: 'normal',
      status: 'active',
    },
    {
      id: 4,
      title: 'Annual Sammelan Registration Open',
      message: 'Registration for Annual Sammelan 2025 is now open. Limited seats available!',
      date: '2025-03-01',
      priority: 'high',
      status: 'active',
    },
    {
      id: 5,
      title: 'Community Hall Renovation Complete',
      message: 'The community hall renovation has been completed. Thank you for your patience.',
      date: '2025-02-20',
      priority: 'low',
      status: 'archived',
    },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create announcement:', newAnnouncement);
    setIsAddModalOpen(false);
    setNewAnnouncement({ title: '', message: '', priority: 'normal' });
  };

  const handleEdit = (id: number) => {
    console.log('Edit announcement:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete announcement:', id);
  };

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">Announcements Management</h2>
          <p className="text-muted-foreground">Create and manage community announcements</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            New Announcement
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>Post a new announcement to the community</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="announcement-title">Title</Label>
                <Input
                  id="announcement-title"
                  placeholder="Enter announcement title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement-message">Message</Label>
                <Textarea
                  id="announcement-message"
                  placeholder="Enter announcement message"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement-priority">Priority</Label>
                <select
                  id="announcement-priority"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Publish</Button>
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
              placeholder="Search announcements..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    announcement.priority === 'high'
                      ? 'bg-red-100 text-red-600'
                      : announcement.priority === 'normal'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <CardTitle className="flex-1">{announcement.title}</CardTitle>
                      <div className="flex gap-2 flex-shrink-0">
                        <Badge
                          className={
                            announcement.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : announcement.priority === 'normal'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {announcement.priority}
                        </Badge>
                        <Badge
                          className={
                            announcement.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{announcement.message}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">
                      Posted on {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(announcement.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-red-50"
                  onClick={() => handleDelete(announcement.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

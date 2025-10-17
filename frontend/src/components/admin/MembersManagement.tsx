import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Search, Plus, Check, X, Edit, Trash2, Grid, List } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function MembersManagement() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const members = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.k@example.com',
      phone: '+91 9876543210',
      city: 'Hyderabad',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Suresh Reddy',
      email: 'suresh.r@example.com',
      phone: '+91 9876543211',
      city: 'Bangalore',
      status: 'pending',
      joinDate: '2025-03-11',
    },
    {
      id: 3,
      name: 'Lakshmi Devi',
      email: 'lakshmi.d@example.com',
      phone: '+91 9876543212',
      city: 'Mumbai',
      status: 'active',
      joinDate: '2024-06-20',
    },
    {
      id: 4,
      name: 'Kiran Kumar',
      email: 'kiran.k@example.com',
      phone: '+91 9876543213',
      city: 'Hyderabad',
      status: 'pending',
      joinDate: '2025-03-10',
    },
    {
      id: 5,
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 9876543214',
      city: 'Delhi',
      status: 'active',
      joinDate: '2024-08-12',
    },
  ];

  const handleApprove = (id: number) => {
    console.log('Approved member:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected member:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit member:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete member:', id);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">Members Management</h2>
          <p className="text-muted-foreground">Manage community members and approvals</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>Enter member details to add them to the community</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 9876543210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Add Member</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and View Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('table')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden lg:table-cell">Phone</TableHead>
                    <TableHead className="hidden sm:table-cell">City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{member.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{member.phone}</TableCell>
                      <TableCell className="hidden sm:table-cell">{member.city}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          {member.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleApprove(member.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleReject(member.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(member.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-red-50"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-foreground">{member.name}</h4>
                          <Badge
                            className={
                              member.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-sm text-muted-foreground">{member.phone}</p>
                    <p className="text-sm text-muted-foreground">{member.city}</p>
                    <div className="flex gap-2 pt-2">
                      {member.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(member.id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(member.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {member.status === 'active' && (
                        <>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(member.id)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-destructive text-destructive hover:bg-red-50"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

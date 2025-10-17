import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Upload, Trash2, Search, X } from 'lucide-react';

export function GalleryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYwMjAyMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Annual Sammelan 2024',
      date: '2024-12-15',
      category: 'Events',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1604522358494-b6f7c67b6c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdWx0dXJhbCUyMGRhbmNlfGVufDF8fHx8MTc2MDIwMjIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Cultural Dance Performance',
      date: '2024-11-20',
      category: 'Cultural',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1606305011336-813aec29c8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjAyMDIyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Temple Visit',
      date: '2024-10-05',
      category: 'Religious',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYwMjAyMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Community Gathering',
      date: '2024-09-12',
      category: 'Events',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1604522358494-b6f7c67b6c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdWx0dXJhbCUyMGRhbmNlfGVufDF8fHx8MTc2MDIwMjIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Youth Program',
      date: '2024-08-22',
      category: 'Social',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1606305011336-813aec29c8f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjAyMDIyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Festival Celebration',
      date: '2024-07-18',
      category: 'Cultural',
    },
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Upload images');
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: number) => {
    console.log('Delete image:', id);
  };

  const filteredImages = galleryImages.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">Gallery Management</h2>
          <p className="text-muted-foreground">Upload and manage community images</p>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <Button className="gap-2" onClick={() => setIsUploadModalOpen(true)}>
            <Upload className="w-4 h-4" />
            Upload Images
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Images</DialogTitle>
              <DialogDescription>Add new images to the gallery</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-file">Select Images</Label>
                <Input id="image-file" type="file" multiple accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-title">Title</Label>
                <Input id="image-title" placeholder="Enter image title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-category">Category</Label>
                <select
                  id="image-category"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                >
                  <option value="Events">Events</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Religious">Religious</option>
                  <option value="Social">Social</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Upload</Button>
                <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
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
              placeholder="Search images..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden group relative">
            <div className="aspect-square overflow-hidden bg-secondary">
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="text-foreground mb-1 line-clamp-1">{image.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{image.category}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedImage(image.id)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-red-50"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {galleryImages.find((img) => img.id === selectedImage)?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>
            <div className="w-full max-h-[70vh] overflow-hidden rounded-lg">
              <ImageWithFallback
                src={galleryImages.find((img) => img.id === selectedImage)?.url || ''}
                alt={galleryImages.find((img) => img.id === selectedImage)?.title || ''}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

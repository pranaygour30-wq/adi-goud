import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Search, Calendar, X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import Masonry from 'react-responsive-masonry';

export function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { api } = await import('../../lib/api');
        const data = await api.gallery();
        setGalleryImages(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredImages = galleryImages.filter((image) =>
    image.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img.id === selectedImage || img._id === selectedImage) 
    : null;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-primary">Community Gallery</h2>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-primary">Community Gallery</h2>
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-primary">Community Gallery</h2>
        <p className="text-muted-foreground">Memorable moments from our events and gatherings</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search gallery..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredImages.length > 0 ? (
            <Masonry columnsCount={3} gutter="16px">
              {filteredImages.map((image) => (
                <div 
                  key={image._id || image.id} 
                  className="mb-4 overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image._id || image.id)}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </Masonry>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No images found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 z-10 bg-background/80 hover:bg-background/90"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImageData && (
              <>
                <div className="max-h-[80vh] overflow-hidden">
                  <ImageWithFallback
                    src={selectedImageData.url}
                    alt={selectedImageData.caption || 'Gallery image'}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-medium">{selectedImageData.caption}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedImageData.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

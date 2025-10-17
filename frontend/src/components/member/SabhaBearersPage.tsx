import { useState, useEffect } from 'react';
import { OfficeBearerCard } from './OfficeBearerCard';
import { Card } from '../ui/card';

export function SabhaBearersPage() {
  const [officeBearers, setOfficeBearers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOfficeBearers() {
      try {
        const { api } = await import('../../lib/api');
        const data = await api.officebearers();
        setOfficeBearers(data);
      } catch (err) {
        console.error('Failed to fetch office bearers:', err);
        setError('Failed to load office bearers. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchOfficeBearers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-primary">Sabha Office Bearers</h2>
          <p className="text-muted-foreground">Current leadership of Adi Goud Brahmin Mahasabha</p>
        </div>
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading office bearers...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-primary">Sabha Office Bearers</h2>
          <p className="text-muted-foreground">Current leadership of Adi Goud Brahmin Mahasabha</p>
        </div>
        <Card className="p-12 text-center">
          <p className="text-destructive">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-primary">Sabha Office Bearers</h2>
        <p className="text-muted-foreground">Current leadership of Adi Goud Brahmin Mahasabha</p>
      </div>

      {/* Bearers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officeBearers.length > 0 ? (
          officeBearers.map((bearer: any) => (
            <OfficeBearerCard 
              key={bearer._id || bearer.id} 
              name={bearer.name}
              designation={bearer.designation}
              phone={bearer.phone}
              email={bearer.email}
              tenure={bearer.tenure || '2023'}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-muted-foreground">No office bearers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

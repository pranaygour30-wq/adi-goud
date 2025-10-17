import { OfficeBearerCard } from './OfficeBearerCard';

export function TrustBearersPage() {
  const trustBearers = [
    {
      id: 1,
      name: 'Sri. Ramachandra Goud',
      designation: 'Chairman',
      phone: '+91 9876543240',
      email: 'ramachandra.g@agbmahasabha.org',
      tenure: '2020',
    },
    {
      id: 2,
      name: 'Sri. Narendra Kumar',
      designation: 'Vice Chairman',
      phone: '+91 9876543241',
      email: 'narendra.k@agbmahasabha.org',
      tenure: '2020',
    },
    {
      id: 3,
      name: 'Smt. Kamala Devi',
      designation: 'Trustee',
      phone: '+91 9876543242',
      email: 'kamala.d@agbmahasabha.org',
      tenure: '2020',
    },
    {
      id: 4,
      name: 'Sri. Balakrishna Reddy',
      designation: 'Trustee',
      phone: '+91 9876543243',
      email: 'balakrishna.r@agbmahasabha.org',
      tenure: '2021',
    },
    {
      id: 5,
      name: 'Sri. Govind Rao',
      designation: 'Trustee',
      phone: '+91 9876543244',
      email: 'govind.r@agbmahasabha.org',
      tenure: '2021',
    },
    {
      id: 6,
      name: 'Smt. Manjula Sharma',
      designation: 'Trustee',
      phone: '+91 9876543245',
      email: 'manjula.s@agbmahasabha.org',
      tenure: '2022',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-primary">Trust Office Bearers</h2>
        <p className="text-muted-foreground">Board of trustees managing the community trust</p>
      </div>

      {/* Bearers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustBearers.map((bearer) => (
          <OfficeBearerCard key={bearer.id} {...bearer} />
        ))}
      </div>
    </div>
  );
}

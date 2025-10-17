import { OfficeBearerCard } from './OfficeBearerCard';

export function PastBearersPage() {
  const pastBearers = [
    {
      id: 1,
      name: 'Dr. Ramesh Goud',
      designation: 'President',
      phone: '+91 9876543220',
      email: 'ramesh.g@example.com',
      tenure: '2015-2018',
    },
    {
      id: 2,
      name: 'Smt. Lakshmi Reddy',
      designation: 'Secretary',
      phone: '+91 9876543221',
      email: 'lakshmi.r@example.com',
      tenure: '2015-2018',
    },
    {
      id: 3,
      name: 'Sri. Venkateswara Rao',
      designation: 'Treasurer',
      phone: '+91 9876543222',
      email: 'venkat.r@example.com',
      tenure: '2015-2018',
    },
    {
      id: 4,
      name: 'Sri. Krishna Murthy',
      designation: 'President',
      phone: '+91 9876543223',
      email: 'krishna.m@example.com',
      tenure: '2018-2021',
    },
    {
      id: 5,
      name: 'Smt. Radha Devi',
      designation: 'Secretary',
      phone: '+91 9876543224',
      email: 'radha.d@example.com',
      tenure: '2018-2021',
    },
    {
      id: 6,
      name: 'Sri. Suresh Kumar',
      designation: 'Treasurer',
      phone: '+91 9876543225',
      email: 'suresh.k@example.com',
      tenure: '2018-2021',
    },
  ];

  // Group by tenure
  const groupedByTenure = pastBearers.reduce((acc, bearer) => {
    if (!acc[bearer.tenure]) {
      acc[bearer.tenure] = [];
    }
    acc[bearer.tenure].push(bearer);
    return acc;
  }, {} as Record<string, typeof pastBearers>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-primary">Past Office Bearers</h2>
        <p className="text-muted-foreground">Honoring those who served our community</p>
      </div>

      {/* Grouped by Tenure */}
      {Object.entries(groupedByTenure).reverse().map(([tenure, bearers]) => (
        <div key={tenure} className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-primary">{tenure}</h3>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bearers.map((bearer) => (
              <OfficeBearerCard key={bearer.id} {...bearer} isPast />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

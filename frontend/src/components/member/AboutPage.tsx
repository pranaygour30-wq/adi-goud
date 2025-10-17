import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, Target, Users, Award } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Unity',
      description: 'Bringing our community together through shared traditions and values',
    },
    {
      icon: Target,
      title: 'Mission',
      description: 'Preserving our cultural heritage while embracing progress',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Supporting every member in their personal and professional growth',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in all our programs and initiatives',
    },
  ];

  const milestones = [
    { year: '2000', event: 'Adi Goud Brahmin Mahasabha Founded' },
    { year: '2005', event: 'First Annual Sammelan with 500+ attendees' },
    { year: '2010', event: 'Community Hall Established in Hyderabad' },
    { year: '2015', event: 'Red Club Youth Wing Launched' },
    { year: '2020', event: 'Digital Transformation - Online Portal Launched' },
    { year: '2025', event: 'Celebrating 25 Years of Community Service' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-primary">About Adi Goud Brahmin Mahasabha</h2>
        <p className="text-muted-foreground">Our journey, mission, and vision</p>
      </div>

      {/* Hero Image */}
      <Card className="overflow-hidden">
        <div className="aspect-[21/9] overflow-hidden bg-secondary">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1704274922558-e3fd87847863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGN1bHR1cmUlMjB0ZW1wbGV8ZW58MXx8fHwxNzYwMTk5Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Adi Goud Brahmin Mahasabha"
            className="w-full h-full object-cover"
          />
        </div>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              To unite and empower the Adi Goud Brahmin community by preserving our rich cultural 
              heritage, promoting educational excellence, and fostering social and economic development 
              among our members.
            </p>
            <p>
              We strive to create a platform where traditions meet progress, where every member 
              finds support, guidance, and opportunities for growth.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/50 to-accent/10 border-accent/30">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              To be the leading community organization that serves as a beacon of cultural preservation, 
              social welfare, and progressive development for the Adi Goud Brahmin community across India.
            </p>
            <p>
              We envision a future where our community thrives in harmony, upholding our values while 
              embracing modern opportunities for growth and success.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <div>
        <h3 className="text-primary mb-6">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Our Story */}
      <Card>
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Founded in 2000, the Adi Goud Brahmin Mahasabha emerged from a vision to create a unified 
            platform for our community. What started as a small gathering of dedicated individuals has 
            grown into a vibrant organization serving thousands of members across India.
          </p>
          <p>
            Over the past 25 years, we have organized numerous cultural events, educational programs, 
            and social initiatives. From our humble beginnings, we have established community halls, 
            launched youth programs, and created a robust support network for members.
          </p>
          <p>
            Our journey has been marked by dedication, community spirit, and an unwavering commitment 
            to preserving our heritage while adapting to the changing times. Today, we stand proud as 
            one of the most active and engaged community organizations, continuing to serve with the 
            same passion and purpose that inspired our founding.
          </p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div>
        <h3 className="text-primary mb-6">Our Journey - Key Milestones</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block"></div>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white relative z-10">
                    <span className="text-sm">{milestone.year}</span>
                  </div>
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <p className="text-foreground">{milestone.event}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

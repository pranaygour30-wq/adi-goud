import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight, Heart, Users, Calendar } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { icon: Users, label: 'Active Members', value: '2,500+' },
    { icon: Calendar, label: 'Events Organized', value: '150+' },
    { icon: Heart, label: 'Years of Service', value: '25+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-orange-500 to-accent py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl md:text-9xl text-white">ॐ</div>
          <div className="absolute bottom-10 right-10 text-6xl md:text-9xl text-white">🕉️</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <span className="text-4xl text-primary">ॐ</span>
            </div>
            <h1 className="text-white mb-6 text-3xl md:text-5xl">Adi Goud Brahmin Mahasabha</h1>
            <p className="text-orange-100 text-lg md:text-xl mb-8 leading-relaxed">
              Uniting our community through tradition, culture, and shared values. 
              Together we celebrate our heritage and build a stronger future for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('login')} 
                size="lg" 
                className="bg-white text-primary hover:bg-orange-50"
              >
                Become a Member
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('contact')} 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-full mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-primary mb-2">{stat.value}</h2>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-primary mb-6">About Our Community</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Adi Goud Brahmin Mahasabha is a vibrant community organization dedicated to preserving 
                  and promoting our rich cultural heritage. For over 25 years, we have been bringing together 
                  families across India to celebrate our traditions, values, and shared identity.
                </p>
                <p>
                  Our mission is to foster unity, support educational initiatives, organize cultural events, 
                  and provide a platform for community members to connect, collaborate, and grow together. 
                  We believe in honoring our past while building a progressive future.
                </p>
                <p>
                  Through various programs, festivals, and social initiatives, we strive to create meaningful 
                  experiences that strengthen our bonds and pass on our cherished traditions to the next generation.
                </p>
              </div>
              <Button className="mt-6" size="lg">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1704274922558-e3fd87847863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGN1bHR1cmUlMjB0ZW1wbGV8ZW58MXx8fHwxNzYwMTk5Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian traditional temple"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Join Our Growing Community</h2>
          <p className="text-orange-100 text-lg mb-8">
            Be part of a thriving community that values tradition, culture, and togetherness. 
            Sign in today and connect with fellow members across the nation.
          </p>
          <Button 
            onClick={() => onNavigate('login')}
            size="lg" 
            className="bg-white text-primary hover:bg-orange-50"
          >
            Member Login
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}

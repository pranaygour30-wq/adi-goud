import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary">ॐ</span>
              </div>
              <h3 className="text-white">Adi Goud Brahmin Mahasabha</h3>
            </div>
            <p className="text-orange-100 text-sm">
              Preserving our heritage, building our future together as one community.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-orange-100 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Community Hall, Hyderabad, Telangana 500001</span>
              </div>
              <div className="flex items-center gap-3 text-orange-100 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3 text-orange-100 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contact@agbmahasabha.org</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-orange-100 text-sm">
          <p>&copy; 2025 Adi Goud Brahmin Mahasabha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

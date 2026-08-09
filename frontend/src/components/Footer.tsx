import { Facebook, Instagram, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-border bg-card/50 px-6 py-16 sm:px-12 lg:px-20 backdrop-blur-sm overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link to="/" className="inline-block group">
              <img src={logoImg} alt="Gopi ka Chatka" className="h-16 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Bringing the authentic soul of traditional Indian vegetarian cuisine to the heart of Melbourne. Made fresh, every single day.
            </p>
            <div className="flex gap-4">
              <Link
                to="https://www.instagram.com/pop101delights/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                to="https://www.facebook.com/profile.php?id=61558491194031"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Explore</h3>
            <nav className="flex flex-col gap-3">
              {['Home', 'Menu', 'About', 'Contact', 'FAQ'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="group flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm font-medium w-fit"
                >
                  {item}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Contact</h3>
            <div className="flex flex-col gap-4">
              <a 
                href="tel:+61412658983" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+61 412 658 983</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                    <span>23 Meriton Pl, Clayton South VIC 3169, Australia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours / newsletter mock */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Opening Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sun - Thu</span>
                <span className="font-medium">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fri - Sat</span>
                <span className="font-medium text-primary">5:30 PM - 12:00 AM</span>
              </div>
              <p className="pt-2 text-xs text-muted-foreground italic">
                * Hours may vary by location.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © {currentYear} Gopi ka Chatka. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
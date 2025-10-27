import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t py-8 px-6 sm:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
          <p className="text-muted-foreground text-sm">© 2025 POP101. All rights reserved.</p>

          <div className="flex gap-8 text-sm">
            <Link to={'/contact'} className="hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link to={'/about'} className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to={'/menu'} className="hover:text-primary transition-colors">
              Menu
            </Link>
          </div>

          <div className="flex gap-6">
            <Link
              to={'https://www.instagram.com/pop101delights/'}
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              to={'https://www.facebook.com/profile.php?id=61558491194031'}
              className="hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 POP101. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

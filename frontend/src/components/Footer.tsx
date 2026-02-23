import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-20 border-t-4 border-border bg-card px-6 py-12 sm:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          {/* Logo / Copyright Section */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h2 className="font-bungee text-2xl uppercase tracking-tighter text-foreground">
              POP101
            </h2>
            <p className="font-bold text-muted-foreground text-sm uppercase tracking-widest">
              © 2026 POP101. All rights reserved.
            </p>
          </div>

          {/* Navigation Links - Designed as "Tabs" */}
          <div className="flex flex-wrap justify-center gap-4">
            {['Menu', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="border-border bg-background hover:bg-primary px-4 py-2 text-sm font-black uppercase transition-all border-2 shadow-[4px_4px_0px_0px_var(--border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-y-[4px] active:shadow-none"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Social Icons - Sticker Style */}
          <div className="flex gap-4">
            <Link
              to="https://www.instagram.com/pop101delights/"
              target="_blank"
              className="border-border bg-chart-5 flex h-12 w-12 items-center justify-center rounded-full border-2 text-foreground transition-all shadow-[4px_4px_0px_0px_var(--border)] hover:rotate-6 hover:scale-110 active:scale-95"
            >
              <Instagram className="h-6 w-6" strokeWidth={2.5} />
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=61558491194031"
              target="_blank"
              className="border-border bg-chart-3 flex h-12 w-12 items-center justify-center rounded-full border-2 text-foreground transition-all shadow-[4px_4px_0px_0px_var(--border)] hover:-rotate-6 hover:scale-110 active:scale-95"
            >
              <Facebook className="h-6 w-6" strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
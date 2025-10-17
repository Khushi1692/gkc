import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { useState } from "react";


const Navbar = () => {
     const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "#" },
    { label: "Locations", href: "#" },
    { label: "About Us", href: "#" },
  ];

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">🍔 Pop101</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button className="hidden sm:flex">Order Now</Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">🍔 Pop101</span>
                  </div>

                  <nav className="flex flex-col gap-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors py-2"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-3 mt-6">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                      Order Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Account
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


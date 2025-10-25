'use client';
import { SignUpModal } from '@/components/SignUpModal';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartSlice';
import { MapPin, ShoppingCart, User } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginModal } from './LoginModal';

// ================= LOGO =================
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// ================= HAMBURGER ICON =================
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// ================= TYPES =================
export interface NavbarNavLink {
  href: string;
  label: string;
}

// ================= DEFAULT LINKS =================
const navigationLinks: NavbarNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

// ================= MAIN COMPONENT =================
export const Navbar = React.forwardRef<HTMLElement, { onSelectBranchClick: () => void }>(
  ({ onSelectBranchClick }, ref) => {
    const { selectedBranch } = useAppSelector((s) => s.branch);
    const { user } = useAppSelector((s) => s.auth);
    const { cart } = useAppSelector((s) => s.cart);

    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [signUpOpen, setSignUpOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const isActive = (href: string) => {
      if (href === '/') return location.pathname === '/';
      return location.pathname.startsWith(href);
    };

    const handleNavigation = (href: string) => {
      navigate(href);
    };

    const dispatch = useAppDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    };

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('login') === 'true') {
        setLoginOpen(true);
      }
    }, [location.search]);

    useEffect(() => {
      if (selectedBranch?._id) {
        dispatch(fetchCart());
      }
    }, [dispatch, selectedBranch?._id]);

    return (
      <>
        <header
          ref={combinedRef}
          className={
            'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur md:px-6 [&_*]:no-underline'
          }
        >
          <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
            {/* LEFT SIDE */}
            <div className="flex flex-1 items-center justify-between gap-4 md:gap-6">
              <div className="flex flex-1 gap-4 lg:gap-8">
                <button
                  onClick={() => navigate('/')}
                  className="text-primary hover:text-primary/90 mr-4 flex items-center space-x-2 transition-colors"
                >
                  <div className="text-2xl">
                    <Logo />
                  </div>
                  <span className="hidden text-xl font-bold sm:inline-block">Pop101</span>
                </button>

                {!isMobile && (
                  <NavigationMenu className="flex">
                    <NavigationMenuList className="gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                          <button
                            onClick={() => handleNavigation(link.href)}
                            className={cn(
                              'group hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                              isActive(link.href)
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground/80 hover:text-foreground'
                            )}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                )}
              </div>

              {selectedBranch && (
                <button
                  onClick={onSelectBranchClick}
                  className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md border px-3 py-1 text-sm font-medium"
                >
                  <MapPin className="text-primary h-4 w-4" />
                  <span>{selectedBranch.name}</span>
                </button>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* CART ICON */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {/* Optional cart count badge */}
                {cart?.items && cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {cart.items.length}
                  </span>
                )}
              </Button>

              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-accent hover:text-accent-foreground rounded-full"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-fit p-2">
                    <div className="flex flex-col space-y-2">
                      <div className="border-b px-4 py-2">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="justify-start text-sm"
                        onClick={() => navigate('/orders')}
                      >
                        My Orders
                      </Button>
                      {/* <Button
                        variant="ghost"
                        className="justify-start text-sm"
                        onClick={() => navigate('/profile')}
                      >
                        Profile
                      </Button> */}
                      <Button
                        variant="ghost"
                        className="justify-start text-sm text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                    onClick={() => setLoginOpen(true)}
                  >
                    Log In
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 rounded-md px-4 text-sm font-medium shadow-sm"
                    onClick={() => setSignUpOpen(true)}
                  >
                    Register
                  </Button>
                </>
              )}

              {isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="group hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      variant="ghost"
                      size="icon"
                    >
                      <HamburgerIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-48 p-2">
                    <NavigationMenu className="max-w-none">
                      <NavigationMenuList className="flex-col items-start gap-1">
                        {navigationLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <button
                              onClick={() => handleNavigation(link.href)}
                              className={cn(
                                'hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive(link.href)
                                  ? 'bg-accent text-accent-foreground'
                                  : 'text-foreground/80'
                              )}
                            >
                              {link.label}
                            </button>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </header>
        <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </>
    );
  }
);

Navbar.displayName = 'Navbar';

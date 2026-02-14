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
import { MapPin, ShoppingCart, User, Package, LogOut } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginModal } from './LoginModal';
import { fetchBranchStatus } from '@/store/slices/branchSlice';

// ================= HAMBURGER ICON =================
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3" // Made slightly bolder for pop art look
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
          setIsMobile(width < 1400);
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
      if (searchParams.get('register') === 'true') {
        setSignUpOpen(true);
      }
    }, [location.search]);

    useEffect(() => {
      if (selectedBranch?._id) {
        dispatch(fetchCart());
      }
    }, [dispatch, selectedBranch?._id]);

    useEffect(() => {
      if (selectedBranch?._id)
        dispatch(fetchBranchStatus({ branchId: selectedBranch?._id }))
    }, [dispatch, selectedBranch?._id]);

    return (
      <>
        <header
          ref={combinedRef}
          className={
            'bg-primary sticky top-0 z-50 w-full border-b-4 border-border px-4 md:px-6'
          }
        >
          <div className="container mx-auto flex h-auto max-w-screen-2xl items-center justify-between gap-2 md:gap-4">
            {/* LEFT SIDE */}
            <div className="flex flex-1 items-center justify-between gap-2 md:gap-4">
              <div className="flex flex-1 gap-2 lg:gap-8">
                <button
                  onClick={() => navigate('/')}
                  className="group mr-2 flex flex-shrink-0 items-center space-x-2 transition-transform hover:scale-105"
                >
                  <img src="/pop101-logo.png" alt="logo" className="h-16 w-16 md:h-32 md:w-32 lg:h-44 lg:w-44 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                  {/* <span className="font-bungee hidden text-2xl uppercase tracking-tighter text-foreground sm:inline-block">Pop<span className="text-primary">101</span></span> */}
                </button>

                {!isMobile && (
                  <NavigationMenu className="flex">
                    <NavigationMenuList className="gap-2">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                          <button
                            onClick={() => handleNavigation(link.href)}
                            className={cn(
                              'inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-2xl text-foreground uppercase transition-all border-2 border-transparent',
                              isActive(link.href)
                                ? 'bg-background border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-foreground'
                                : 'text-foreground hover:text-foreground hover:bg-background/50'
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
                  className="h-10 flex max-w-[120px] items-center gap-2 rounded-xl border-2 border-border bg-card px-3 py-1.5 text-xs font-black uppercase transition-transform hover:translate-y-[1px] md:max-w-none md:text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="truncate">{selectedBranch.name}</span>
                </button>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* CART ICON */}
              <Button
                variant="outline"
                size="icon"
                className="relative border-2 border-border bg-card shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-all active:translate-y-[2px] active:shadow-none"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
                {cart?.items && cart.items.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-destructive text-[10px] font-black text-white">
                    {cart.items.length}
                  </span>
                )}
              </Button>

              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="rounded-full border-2 border-border p-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-105"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-primary flex h-10 w-9 items-center justify-center rounded-full">
                          <User className="h-5 w-5 text-black" />
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-56 border-4 border-border p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex flex-col space-y-2">
                      <div className="border-b-2 border-border/10 px-4 py-3">
                        <p className="font-bungee text-sm uppercase leading-none">{user.name}</p>
                        <p className="mt-1 truncate text-xs font-bold text-muted-foreground">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="justify-start font-bold uppercase text-sm hover:bg-accent"
                        onClick={() => navigate('/orders')}
                      >
                        <Package className="mr-2 h-4 w-4" /> My Orders
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-bold uppercase text-sm text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-10 border-2 border-border font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-all active:translate-y-[2px] active:shadow-none text-xl"
                    onClick={() => setLoginOpen(true)}
                  >
                    {isMobile ? <User className="h-5 w-5" /> : 'Log In'}
                  </Button>
                  {!isMobile && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 border-2 border-border font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-accent transition-all active:translate-y-[2px] active:shadow-none text-xl"
                      onClick={() => setSignUpOpen(true)}
                    >
                      Join
                    </Button>
                  )}
                </div>
              )}

              {isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="group h-10 w-10 border-2 border-border bg-card shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-accent"
                      variant="ghost"
                      size="icon"
                    >
                      <HamburgerIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 border-4 border-border p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <NavigationMenu className="max-w-none w-full">
                      <NavigationMenuList className="flex-col items-stretch gap-1 w-full">
                        {navigationLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <button
                              onClick={() => handleNavigation(link.href)}
                              className={cn(
                                'flex w-full cursor-pointer items-center rounded-lg px-4 py-3 text-sm font-black uppercase transition-colors',
                                isActive(link.href)
                                  ? 'bg-primary text-foreground'
                                  : 'text-foreground/80 hover:bg-accent'
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
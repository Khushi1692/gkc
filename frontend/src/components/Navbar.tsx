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
import { PopoverClose } from '@radix-ui/react-popover';
import { ForgotPasswordModal } from './ForgotPasswordModal';

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
  { href: '/faq', label: 'FAQ' },
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
    const [forgotOpen, setForgotOpen] = useState(false);

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

      if (searchParams.get('forgot') === 'true') {
        setForgotOpen(true);
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
            'sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 md:px-6'
          }
        >
          <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4">
            {/* LEFT SIDE */}
            <div className="flex flex-1 items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className="group flex flex-shrink-0 items-center transition-transform hover:scale-105"
              >
                <img src="/logo.png" alt="Gopi ka Chatka" className="h-16 w-auto transition-transform group-hover:scale-105" />
              </button>

              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className={cn(
                            'inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold uppercase tracking-wider transition-all',
                            isActive(link.href)
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'text-foreground/70 hover:text-foreground hover:bg-accent'
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

            {/* MIDDLE/RIGHT - Branch Selector & User Icons */}
            <div className="flex items-center gap-4">
              {selectedBranch && (
                <button
                  onClick={onSelectBranchClick}
                  className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-xs font-bold uppercase transition-all hover:bg-accent shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate max-w-[150px]">{selectedBranch.name}</span>
                </button>
              )}

              {/* CART ICON */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart?.items && cart.items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cart.items.length}
                  </span>
                )}
              </Button>

              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2 overflow-hidden shadow-inner">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-avatar');
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={cn(
                        "bg-primary/10 h-10 w-10 items-center justify-center rounded-full fallback-avatar",
                        user.avatar ? "hidden" : "flex"
                      )}>
                        <User className="h-5 w-5 text-primary" />
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-2 rounded-2xl shadow-xl border-border/50">
                    <PopoverClose asChild>
                      <div className="flex flex-col space-y-1">
                        <div className="px-4 py-3 mb-1 border-b border-border/10">
                          <p className="text-sm font-bold truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          className="justify-start rounded-xl font-semibold text-sm"
                          onClick={() => navigate('/orders')}
                        >
                          <Package className="mr-3 h-4 w-4 opacity-70" /> My Orders
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start rounded-xl font-semibold text-sm text-destructive hover:text-destructive hover:bg-destructive/5"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-3 h-4 w-4 opacity-70" /> Logout
                        </Button>
                      </div>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="h-10 px-6 font-bold uppercase text-xs tracking-widest rounded-full"
                    onClick={() => setLoginOpen(true)}
                  >
                    Log In
                  </Button>
                  {!isMobile && (
                    <Button
                      className="h-10 px-6 font-bold uppercase text-xs tracking-widest rounded-full shadow-lg shadow-primary/20"
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
                      className="h-10 w-10 rounded-full hover:bg-accent"
                      variant="ghost"
                      size="icon"
                    >
                      <HamburgerIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-screen max-w-[300px] p-2 mt-2 rounded-[2rem] shadow-2xl border-border/50">
                    <NavigationMenu className="w-full">
                      <NavigationMenuList className="flex-col items-stretch gap-1 w-full">
                        {navigationLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <PopoverClose asChild>
                              <button
                                onClick={() => handleNavigation(link.href)}
                                className={cn(
                                  'flex w-full items-center rounded-2xl px-5 py-4 text-sm font-bold uppercase tracking-widest transition-all',
                                  isActive(link.href)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-foreground/70 hover:bg-accent'
                                )}
                              >
                                {link.label}
                              </button>
                            </PopoverClose>
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
        <ForgotPasswordModal open={forgotOpen} onOpenChange={setForgotOpen} />
      </>
    );
  }
);

Navbar.displayName = 'Navbar';
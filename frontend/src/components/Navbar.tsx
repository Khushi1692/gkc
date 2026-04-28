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
import { MapPin, ShoppingCart, User, Package, LogOut, ArrowRight } from 'lucide-react';
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
            'sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-2xl px-8 transition-all duration-500'
          }
        >
          <div className="container mx-auto flex h-24 max-w-screen-2xl items-center justify-between gap-12">
            {/* LEFT SIDE - Brand */}
            <div className="flex items-center gap-12">
              <button
                onClick={() => navigate('/')}
                className="group flex flex-shrink-0 items-center transition-transform hover:scale-105 active:scale-95"
              >
                <img src="/logo.png" alt="Gopi ka Chatka" className="h-16 w-auto drop-shadow-2xl" />
              </button>

              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className={cn(
                            'relative h-12 flex items-center justify-center rounded-2xl px-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group',
                            isActive(link.href)
                              ? 'text-primary'
                              : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                          )}
                        >
                          {link.label}
                          {isActive(link.href) && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full shadow-lg shadow-primary/40 animate-pulse-soft"></div>
                          )}
                        </button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>

            {/* RIGHT SIDE - Actions */}
            <div className="flex items-center gap-6">
              {selectedBranch && (
                <button
                  onClick={onSelectBranchClick}
                  className="hidden sm:flex items-center gap-3 glass-card px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 group"
                >
                  <MapPin className="h-4 w-4 text-primary group-hover:animate-bounce" />
                  <span className="truncate max-w-[150px] opacity-80 group-hover:opacity-100">{selectedBranch.name}</span>
                </button>
              )}

              <div className="flex items-center gap-3">
                {/* CART ICON */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-12 w-12 rounded-2xl glass-card hover:bg-primary hover:text-primary-foreground group"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                    {cart?.items && cart.items.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-background animate-bounce">
                        {cart.items.length}
                    </span>
                    )}
                </Button>

                {user ? (
                    <Popover>
                    <PopoverTrigger asChild>
                        <button className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center hover:border-primary transition-all overflow-hidden group shadow-lg shadow-black/5">
                        {user.avatar ? (
                            <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="bg-primary/5 h-full w-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                        )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72 p-4 glass rounded-[2.5rem] shadow-2xl border-white/5 mt-4">
                        <PopoverClose asChild>
                        <div className="flex flex-col space-y-2">
                            <div className="px-4 py-5 mb-2 rounded-3xl bg-white/5 border border-white/5">
                            <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Authenticated</p>
                            <p className="text-sm font-bold truncate">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate opacity-60 font-medium">{user.email}</p>
                            </div>
                            <Button
                            variant="ghost"
                            className="justify-start h-12 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 hover:text-primary group"
                            onClick={() => navigate('/orders')}
                            >
                            <Package className="mr-4 h-4 w-4 opacity-50 group-hover:opacity-100" /> My Orders
                            </Button>
                            <Button
                            variant="ghost"
                            className="justify-start h-12 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-destructive hover:text-destructive hover:bg-destructive/5 group"
                            onClick={handleLogout}
                            >
                            <LogOut className="mr-4 h-4 w-4 opacity-50 group-hover:opacity-100" /> Logout
                            </Button>
                        </div>
                        </PopoverClose>
                    </PopoverContent>
                    </Popover>
                ) : (
                    <div className="flex gap-4">
                    {!isMobile && (
                        <Button
                            variant="ghost"
                            className="h-12 px-8 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-white/5"
                            onClick={() => setLoginOpen(true)}
                        >
                            Log In
                        </Button>
                    )}
                    <Button
                        className="h-12 px-10 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        onClick={() => setSignUpOpen(true)}
                    >
                        Join Now
                    </Button>
                    </div>
                )}

                {isMobile && (
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        className="h-12 w-12 rounded-2xl glass-card"
                        variant="ghost"
                        size="icon"
                        >
                        <HamburgerIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[calc(100vw-2rem)] p-4 mt-4 glass rounded-[3rem] shadow-2xl border-white/5">
                        <NavigationMenu className="w-full">
                        <NavigationMenuList className="flex-col items-stretch gap-2 w-full">
                            {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index} className="w-full">
                                <PopoverClose asChild>
                                <button
                                    onClick={() => handleNavigation(link.href)}
                                    className={cn(
                                    'flex w-full items-center justify-between rounded-[2rem] px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all',
                                    isActive(link.href)
                                        ? 'bg-primary text-primary-foreground shadow-xl'
                                        : 'text-foreground/70 hover:bg-white/5'
                                    )}
                                >
                                    {link.label}
                                    <ArrowRight className={cn("h-4 w-4 opacity-0 transition-all", isActive(link.href) ? "opacity-100 translate-x-0" : "-translate-x-4")} />
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
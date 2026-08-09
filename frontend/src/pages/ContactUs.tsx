'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getBranchById } from '@/store/slices/branchSlice';
import { resetContactState, sendContactMessage } from '@/store/slices/contactSlice';
import type { BranchWithOpeningHours } from '@/types/branch';
import { contactUsSchema, type ContactUsInput } from '@/validators/contact';

import { Clock, MapPin, Phone, SendHorizontal, Sparkles } from 'lucide-react';

interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

const dayLabels: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

function convertTo12Hour(time: string) {
  const [h, m] = time.split(':');
  let hour = Number(h);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${m} ${suffix}`;
}

// Helper to group operating hours (e.g., "Mon - Fri: 9AM - 5PM")
function groupOperatingHours(hours: OperatingHour[]) {
  if (!hours) return [];

  const formatted = hours.map((h) => ({
    day: dayLabels[h.day.toLowerCase()] || h.day,
    time: h.isClosed ? 'Closed' : `${convertTo12Hour(h.open)} – ${convertTo12Hour(h.close)}`,
  }));

  return formatted;
}

const ContactUs = () => {
  const dispatch = useAppDispatch();
  const { selectedBranch } = useAppSelector((s) => s.branch);
  const { loading, success, error } = useAppSelector((s) => s.contact);
  const [branchInfo, setBranchInfo] = useState<BranchWithOpeningHours | null>(null);
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsInput>({
    resolver: zodResolver(contactUsSchema),
  });

  useEffect(() => {
    if (selectedBranch) {
      setMarkerLocation({
        lat: selectedBranch.location.coordinates[1],
        lng: selectedBranch.location.coordinates[0],
      });

      dispatch(getBranchById({ branchId: selectedBranch._id }))
        .unwrap()
        .then((res) => {
          setBranchInfo(res.data);
        });
    }
  }, [dispatch, selectedBranch]);

  useEffect(() => {
    return () => {
      dispatch(resetContactState());
    };
  }, [dispatch]);

  const onSubmit = (data: ContactUsInput) => {
    dispatch(sendContactMessage(data)).then((res) => {
      if (res.type === 'contact/sendMessage/fulfilled') {
        reset();
      }
    });
  };

  return (
    <div className="bg-background min-h-screen px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-32">

      {/* HEADER SECTION */}
      <div className="mx-auto mb-24 max-w-4xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-[fade-in_0.8s_ease-out]">
          <Sparkles className="h-3 w-3" />
          Get in Touch
        </div>
        <h1 className="font-extrabold mb-8 text-5xl text-foreground sm:text-7xl lg:text-8xl tracking-tight leading-[1] uppercase animate-[slide-up_1s_ease-out]">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic pr-4">Chat</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto italic animate-[slide-up_1.2s_ease-out]">
          "Got a question? Want to book a table? Or just say hi? We're here to help you experience the best of Gopi ka Chatka."
        </p>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="mx-auto grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

        {/* LEFT: CONTACT FORM (Premium Card) */}
        <div className="bg-card flex flex-col rounded-[3.5rem] p-8 shadow-2xl border border-border/40 md:p-12 lg:p-16 transition-all duration-500 hover:shadow-primary/5 animate-[slide-up_1.4s_ease-out]">
          <h2 className="font-bold mb-12 text-3xl uppercase tracking-tight text-foreground">Send a Message</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-2">Your Name</label>
              <Input
                placeholder="John Doe"
                {...register('name')}
                className="h-16 rounded-2xl border-border/50 bg-secondary/30 px-8 font-semibold text-foreground transition-all focus-visible:ring-primary focus-visible:bg-secondary/50 placeholder:text-muted-foreground/20 shadow-inner text-base"
              />
              {errors.name && <p className="text-sm font-medium text-destructive ml-2 font-bold">{errors.name.message}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-2">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className="h-16 rounded-2xl border-border/50 bg-secondary/30 px-8 font-semibold text-foreground transition-all focus-visible:ring-primary focus-visible:bg-secondary/50 placeholder:text-muted-foreground/20 shadow-inner text-base"
              />
              {errors.email && <p className="text-sm font-medium text-destructive ml-2 font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-2">Subject</label>
              <Input
                placeholder="Feedback / Inquiry"
                {...register('subject')}
                className="h-16 rounded-2xl border-border/50 bg-secondary/30 px-8 font-semibold text-foreground transition-all focus-visible:ring-primary focus-visible:bg-secondary/50 placeholder:text-muted-foreground/20 shadow-inner text-base"
              />
              {errors.subject && <p className="text-sm font-medium text-destructive ml-2 font-bold">{errors.subject.message}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-2">Message</label>
              <Textarea
                placeholder="Tell us what's on your mind..."
                rows={5}
                {...register('message')}
                className="rounded-2xl border-border/50 bg-secondary/30 px-8 py-6 font-semibold text-foreground transition-all focus-visible:ring-primary focus-visible:bg-secondary/50 placeholder:text-muted-foreground/20 shadow-inner resize-none min-h-[180px] text-base"
              />
              {errors.message && <p className="text-sm font-medium text-destructive ml-2 font-bold">{errors.message.message}</p>}
            </div>

            {success && (
              <div className="bg-primary/10 rounded-2xl p-6 text-center font-bold text-primary border border-primary/20 animate-in fade-in zoom-in duration-500">
                🚀 Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="bg-destructive/10 text-destructive rounded-2xl p-6 text-center font-bold border border-destructive/20 animate-in fade-in zoom-in duration-500">
                ⚠️ {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-6 h-18 w-full text-base font-black uppercase tracking-[0.2em] rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] transition-all group"
            >
              {loading ? 'Sending...' : (
                <>
                  Send Message
                  <SendHorizontal className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* RIGHT: BRANCH INFO (Premium Card) */}
        {branchInfo ? (
          <div className="bg-primary text-primary-foreground flex flex-col rounded-[3.5rem] p-8 shadow-2xl relative overflow-hidden md:p-12 lg:p-16 animate-[slide-up_1.6s_ease-out] selection:bg-white selection:text-primary">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-black/20 opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
            
            <h2 className="font-extrabold mb-12 text-3xl uppercase tracking-tighter relative z-10">Branch Info</h2>

            <div className="flex flex-col gap-10 relative z-10">
              {/* Phone */}
              <div className="flex items-center gap-8 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 transition-transform group-hover:scale-110">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Call Us</h3>
                  <p className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">{branchInfo.phone}</p>
                </div>
              </div>



              {/* Address */}
              <div className="flex items-center gap-8 group">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 transition-transform group-hover:scale-110">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Visit Us</h3>
                  <p className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">{branchInfo.address}</p>
                </div>
              </div>

              {/* Hours - Modern Style */}
              <div className="bg-white/5 backdrop-blur-2xl mt-8 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
                <div className="mb-8 flex items-center gap-4">
                  <Clock className="h-6 w-6 opacity-60" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Opening Hours</h3>
                </div>
                <div className="space-y-6">
                  {groupOperatingHours(branchInfo.operatingHours).map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="font-extrabold text-xs tracking-[0.1em] uppercase opacity-70">{h.day}</span>
                      <span className="font-bold text-sm tracking-tight">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="border border-border/40 bg-card/40 backdrop-blur-sm flex h-full items-center justify-center rounded-[3.5rem] p-16 relative overflow-hidden shadow-xl animate-pulse">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-3xl border-[6px] border-primary/20 border-t-primary animate-spin"></div>
              <p className="font-black text-sm text-primary uppercase tracking-[0.3em]">Loading Essentials</p>
            </div>
          </div>
        )}

      </div>

      {/* MAP SECTION - Modern Style */}
      <div className="mx-auto mt-24 w-full animate-[fade-in_2s_ease-out]">
        <div className="bg-card overflow-hidden rounded-[4rem] shadow-2xl border border-border/40 relative">
          <div className="absolute top-10 left-10 z-10">
            <div className="glass px-8 py-3 rounded-full shadow-2xl text-foreground font-black uppercase tracking-[0.3em] text-xs border-white/40">
              Find Gopi ka Chatka
            </div>
          </div>
          <div className="h-[600px] w-full bg-muted/30">
            {selectedBranch?.googleMapsEmbedUrl ? (
              <iframe
                src={selectedBranch.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[4rem]"
              ></iframe>
            ) : markerLocation && (
              <Map
                style={{ width: '100%', height: '100%' }}
                defaultZoom={15}
                defaultCenter={markerLocation}
                gestureHandling={'cooperative'}
                disableDefaultUI={false}
                mapId="DEMO_MAP_ID"
              >
                <Marker position={markerLocation} title={selectedBranch?.name || 'Gopi ka Chatka'} />
              </Map>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
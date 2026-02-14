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
import { contactUsSchema, type ContactUsInput } from '@/validators/contact';
import type { BranchWithOpeningHours } from '@/types/branch';

import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';

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

  // Simple grouping logic can be expanded here if needed
  // For now, returning strictly mapped for display
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
    <div className="bg-background min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-20 xl:px-32">

      {/* HEADER SECTION */}
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="font-bungee mb-4 text-5xl text-foreground drop-shadow-[4px_4px_0px_var(--border)] sm:text-6xl md:text-7xl">
          LET'S <span className="text-primary text-shadow-black" style={{ textShadow: '4px 4px 0 var(--border)' }}>CHAT</span>
        </h1>
        <p className="text-lg font-bold text-foreground/80">
          Got a question? Want to book a table? Or just say hi? Drop us a line!
        </p>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="mx-auto grid w-full grid-cols-1 gap-8 lg:grid-cols-2">

        {/* LEFT: CONTACT FORM (White Card) */}
        <div className="border-border bg-card flex flex-col rounded-3xl border-4 p-6 shadow-[8px_8px_0px_0px_var(--border)] md:p-10">
          <h2 className="font-bungee mb-6 text-3xl uppercase text-foreground">Send a Message</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-sm font-bold uppercase text-foreground">Your Name</label>
              <Input
                placeholder="John Doe"
                {...register('name')}
                className="border-border focus-visible:ring-primary h-12 border-2 bg-input font-bold text-foreground shadow-[4px_4px_0px_0px_var(--border)] placeholder:text-muted-foreground/50"
              />
              {errors.name && <p className="text-sm font-bold text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold uppercase text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className="border-border focus-visible:ring-primary h-12 border-2 bg-input font-bold text-foreground shadow-[4px_4px_0px_0px_var(--border)] placeholder:text-muted-foreground/50"
              />
              {errors.email && <p className="text-sm font-bold text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold uppercase text-foreground">Subject</label>
              <Input
                placeholder="Feedback / Inquiry"
                {...register('subject')}
                className="border-border focus-visible:ring-primary h-12 border-2 bg-input font-bold text-foreground shadow-[4px_4px_0px_0px_var(--border)] placeholder:text-muted-foreground/50"
              />
              {errors.subject && <p className="text-sm font-bold text-destructive">{errors.subject.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold uppercase text-foreground">Message</label>
              <Textarea
                placeholder="Tell us what's on your mind..."
                rows={5}
                {...register('message')}
                className="border-border focus-visible:ring-primary border-2 bg-input font-bold text-foreground shadow-[4px_4px_0px_0px_var(--border)] placeholder:text-muted-foreground/50 resize-none h-46"
              />
              {errors.message && <p className="text-sm font-bold text-destructive">{errors.message.message}</p>}
            </div>

            {success && (
              <div className="border-border bg-chart-4 rounded-xl border-2 p-3 text-center font-bold text-foreground shadow-[4px_4px_0px_0px_var(--border)]">
                ✅ Message sent successfully!
              </div>
            )}
            {error && (
              <div className="border-border bg-destructive text-destructive-foreground rounded-xl border-2 p-3 text-center font-bold shadow-[4px_4px_0px_0px_var(--border)]">
                ❌ {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 w-full text-lg font-black uppercase shadow-[4px_4px_0px_0px_var(--border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)]"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* RIGHT: BRANCH INFO (Yellow Card) */}
        {branchInfo ? (
          <div className="border-border bg-primary flex flex-col rounded-3xl border-4 p-6 shadow-[8px_8px_0px_0px_var(--border)] md:p-10">
            <h2 className="font-bungee mb-8 text-3xl uppercase text-foreground">Branch Info</h2>

            <div className="flex flex-col gap-6">

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="border-border flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-[2px_2px_0px_0px_var(--border)]">
                  <Phone className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bungee text-xl uppercase text-foreground">Call Us</h3>
                  <p className="text-lg font-bold text-foreground/80">{branchInfo.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="border-border flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-[2px_2px_0px_0px_var(--border)]">
                  <Mail className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bungee text-xl uppercase text-foreground">Email</h3>
                  <p className="text-lg font-bold text-foreground/80 break-all">{branchInfo.email}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="border-border flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-[2px_2px_0px_0px_var(--border)]">
                  <MapPin className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bungee text-xl uppercase text-foreground">Visit Us</h3>
                  <p className="text-lg font-bold text-foreground/80">{branchInfo.address}</p>
                </div>
              </div>

              {/* Hours - Sticker Style */}
              <div className="border-border bg-card mt-4 rounded-2xl border-2 p-5 shadow-[4px_4px_0px_0px_var(--border)] w-md">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-foreground" />
                  <h3 className="font-bungee text-lg uppercase text-foreground">Opening Hours</h3>
                </div>
                <div className="space-y-2">
                  {groupOperatingHours(branchInfo.operatingHours).map((h, i) => (
                    <div key={i} className="flex justify-between border-b-2 border-dashed border-gray-200 pb-1 last:border-0 last:pb-0">
                      <span className="font-bold uppercase text-foreground">{h.day}</span>
                      <span className="font-mono font-medium text-foreground/80">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="border-border bg-muted flex h-full items-center justify-center rounded-3xl border-4 border-dashed p-10">
            <p className="font-bungee text-xl text-muted-foreground">Loading Branch Info...</p>
          </div>
        )}

      </div>

      {/* MAP SECTION - Sticker Style */}
      <div className="mx-auto mt-12 w-full">
        <div className="border-border bg-card overflow-hidden rounded-3xl border-4 shadow-[8px_8px_0px_0px_var(--border)]">
          <div className="h-[400px] w-full bg-gray-200">
            {markerLocation && (
              <Map
                style={{ width: '100%', height: '100%' }}
                defaultZoom={15}
                defaultCenter={markerLocation}
                gestureHandling={'cooperative'}
                disableDefaultUI={false}
                mapId="DEMO_MAP_ID" // Required for AdvancedMarker if using newer Google Maps
              >
                <Marker position={markerLocation} />
              </Map>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
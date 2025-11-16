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
import { Card, CardContent } from '@/components/ui/card';

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

function groupOperatingHours(hours: OperatingHour[]) {
  const formatted = hours.map((h) => ({
    day: dayLabels[h.day],
    key: h.isClosed ? 'Closed' : `${convertTo12Hour(h.open)} – ${convertTo12Hour(h.close)}`,
  }));

  // Group by identical time range
  const groups: Record<string, string[]> = {};

  formatted.forEach(({ day, key }) => {
    if (!groups[key]) groups[key] = [];
    groups[key].push(day);
  });

  // Format results
  return Object.entries(groups).map(([time, days]) => {
    // Combine consecutive days like Mon–Tue–Wed => Mon – Wed
    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const sorted = days.sort((a, b) => orderedDays.indexOf(a) - orderedDays.indexOf(b));

    let ranges: string[] = [];
    let start = sorted[0];
    let prev = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      const curr = sorted[i];
      const prevIndex = orderedDays.indexOf(prev);
      const currIndex = orderedDays.indexOf(curr);

      if (currIndex === prevIndex + 1) {
        prev = curr;
      } else {
        ranges.push(start === prev ? start : `${start} – ${prev}`);
        start = curr;
        prev = curr;
      }
    }

    ranges.push(start === prev ? start : `${start} – ${prev}`);

    return {
      days: ranges.join(', '),
      time,
    };
  });
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
    <div className="bg-background min-h-screen px-4 py-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
      {/* FORM + CONTACT CARD SIDE BY SIDE */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-8 p-6 md:grid-cols-2">
        <Card className="flex h-full flex-col justify-center">
          <CardContent>
            <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
              <Input placeholder="Your Name" {...register('name')} />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

              <Input type="email" placeholder="Your Email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

              <Input placeholder="Subject" {...register('subject')} />
              {errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}

              <Textarea placeholder="Message" rows={5} {...register('message')} />
              {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}

              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-600">{error}</p>}

              <Button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT INFO CARD */}
        {branchInfo && (
          <div className="bg-primary/10 flex h-full flex-col rounded-xl p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>

            <div className="flex-1">
              {/* Phone */}
              <div className="mb-4 flex items-start gap-3">
                <Phone className="text-primary mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>{branchInfo.phone}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="mb-4 flex items-start gap-3">
                <MessageCircle className="text-primary mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p>{branchInfo.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 flex items-start gap-3">
                <Mail className="text-primary mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{branchInfo.email}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-4 flex items-start gap-3">
                <Clock className="text-primary mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">Opening Hours</p>
                  {groupOperatingHours(branchInfo.operatingHours).map((h, i) => (
                    <p key={i}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="mb-4 flex items-start gap-3">
                <MapPin className="text-primary mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p>{branchInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MAP FULL WIDTH BELOW */}
      <div className="mx-auto mt-10 h-[400px] w-full max-w-6xl overflow-hidden rounded-md shadow-md">
        {markerLocation && (
          <Map
            style={{ borderRadius: '20px' }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={'greedy'}
            disableDefaultUI
          >
            <Marker position={markerLocation} />
          </Map>
        )}
      </div>
    </div>
  );
};

export default ContactUs;

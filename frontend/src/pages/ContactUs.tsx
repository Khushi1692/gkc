'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { resetContactState, sendContactMessage } from '@/store/slices/contactSlice';
import { contactUsSchema, type ContactUsInput } from '@/validators/contact';

const ContactUs = () => {
  const dispatch = useAppDispatch();
  const { selectedBranch } = useAppSelector((s) => s.branch);
  const { loading, success, error } = useAppSelector((s) => s.contact);
  const [markerLocation, setMarkerLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  console.log(selectedBranch);

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
    }
  }, [selectedBranch]);

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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 p-6 md:grid-cols-2">
      {/* Form */}
      <div>
        <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
      </div>

      {/* Google Map */}
      <div className="h-[400px] w-full overflow-hidden rounded-md shadow-md md:h-full">
        <Map
          style={{ borderRadius: '20px' }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          <Marker position={markerLocation} />
        </Map>
      </div>
    </div>
  );
};

export default ContactUs;

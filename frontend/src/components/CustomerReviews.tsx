'use client';

import customer1 from '@/assets/customer-1.png';
import customer2 from '@/assets/customer-2.png';
import customer3 from '@/assets/customer-3.png';

const reviews = [
  { name: 'Dr. Ramakant Rana', image: customer1, review: 'I had the pink sauce pasta at Pop101 and it was amazing! The pasta was cooked just right and the sauce was really tasty and creamy. The place has a cool, raw look with Indian vibes – very relaxed and different.' },
  { name: 'Palak Varma', image: customer2, review: 'Had a wonderful time at this place! The atmosphere was cozy and perfect for spending time with friends or family. The food was amazing, especially the pasta and burger—both were flavorful.' },
  { name: 'Pankaj Passi', image: customer3, review: 'Ordered takeaway from Mumbai Pop 101 Delights and the experience was excellent! The food was packed neatly, still hot on arrival, and tasted absolutely delicious. Portion sizes were generous.' },
];

const CustomerReviews = () => {
  return (
    <section className="w-full pb-20">
      <h2 className="font-bungee mb-12 text-center text-4xl uppercase md:text-6xl">
        STREET <span className="text-primary">TALK</span>
      </h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Speech Bubble */}
            <div className="relative mb-8 rounded-2xl border-4 border-border bg-card p-6 shadow-sm">
              <p className="relative z-10 font-bold leading-tight italic">
                <span className="text-primary font-serif text-3xl">“</span>
                {review.review}
              </p>
              {/* Bubble Tip */}
              <div className="absolute -bottom-4 left-10 h-8 w-8 rotate-45 border-b-4 border-r-4 border-border bg-card" />
            </div>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-border shadow-sm">
                <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-bungee text-lg uppercase tracking-tight">{review.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
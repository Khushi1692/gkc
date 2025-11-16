'use client';

import customer1 from '@/assets/customer-1.png';
import customer2 from '@/assets/customer-2.png';
import customer3 from '@/assets/customer-3.png';

const reviews = [
  {
    name: 'Dr. Ramakant Rana',
    review:
      'I had the pink sauce pasta at Pop101 and it was amazing! The pasta was cooked just right and the sauce was really tasty and creamy. The place has a cool, raw look with Indian vibes – very relaxed and different. The person working there was friendly too. I really enjoyed my meal and will definitely come back again!',
    image: customer1,
  },
  {
    name: 'Palak Varma',
    review:
      'Had a wonderful time at this place! The atmosphere was cozy and perfect for spending time with friends or family. The food was amazing, especially the pasta and burger—both were flavorful and cooked to perfection. Highly recommend if you’re looking for great food and a nice place to relax!',
    image: customer2,
  },
  {
    name: 'Pankaj Passi',
    review:
      'Ordered takeaway from Mumbai Pop 101 Delights and the experience was excellent! The food was packed neatly, still hot on arrival, and tasted absolutely delicious. Portion sizes were generous and flavors were spot on. Great value for money — will definitely be ordering again!',
    image: customer3,
  },
];

const CustomerReviews = () => {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Customer Reviews</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-border bg-card rounded-xl border p-5 shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Small Image */}
              <div className="bg-secondary h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
              </div>

              {/* Name */}
              <div>
                <h3 className="text-base font-semibold">{review.name}</h3>
              </div>
            </div>

            {/* Long Review Text */}
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              <span className="text-primary mr-1 font-serif text-lg">“</span>
              {review.review}
              <span className="text-primary ml-1 font-serif text-lg">”</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;

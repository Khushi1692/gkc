'use client';

import customer1 from '@/assets/customer-1.png';
import customer2 from '@/assets/customer-2.png';
import customer3 from '@/assets/customer-3.png';

const reviews = [
  {
    name: 'Dr. Ramakant Rana',
    image: customer1,
    role: 'Regular Guest',
    review: 'The dal baati churma here is absolutely authentic — it reminded me of home in Gujarat. The ghee, the texture, everything is just right. A hidden gem in Melbourne.',
  },
  {
    name: 'Palak Varma',
    image: customer2,
    role: 'Food Enthusiast',
    review: 'Finally a place that gets Kathiyawadi food right. The thali is generous, the kadhi is perfectly spiced, and the atmosphere feels warm and welcoming.',
  },
  {
    name: 'Pankaj Passi',
    image: customer3,
    role: 'Takeaway Customer',
    review: 'Ordered takeaway from Gopi ka Chatka and the food arrived hot, packed beautifully. The undhiyu was outstanding — exactly like my grandmother used to make.',
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-4">
      {/* Header */}
      <div className="mb-14 text-center max-w-xl mx-auto">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-3">
          Guest Reviews
        </p>
        <h2 className="text-4xl font-bold text-foreground md:text-5xl leading-tight">
          What Our Guests Say
        </h2>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div key={index} className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-colors hover:shadow-lg hover:shadow-primary/5">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-primary text-primary" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground/80 text-sm leading-relaxed mb-8 italic">
              "{review.review}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={review.image}
                alt={review.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
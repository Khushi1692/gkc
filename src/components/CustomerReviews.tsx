'use client';




const reviews = [
  {
    name: 'the nik take',
    role: 'Food Blogger',
    review: 'Gopi Ka Chatka in Clayton is a fantastic spot for authentic Indian street food 🌶️ The pani puri cart is a real highlight, offering four different flavoured pani, each refreshing and full of flavour.',
  },
  {
    name: 'Gaurav Gulati',
    role: 'Regular Guest',
    review: 'Walking into Gopi Ka Chatka Clayton gives you a feeling of Indian street food corner. The vibe is exotic with vibrant colors and limited seating, but the kids’ play corner and gaming zone are thoughtful touches. Lot of options to try ranging from Pani Puri to Pav Bhaji.',
  },
  {
    name: 'Aarti Babbar',
    role: 'Happy Customer',
    review: 'I had an absolutely amazing experience! The food was incredibly delicious, fresh, and full of flavor. Every bite felt perfectly balanced, with just the right amount of spices and seasoning. The presentation was also beautiful, which made the meal even more enjoyable.',
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
              <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-black text-lg uppercase shrink-0">
                {review.name.charAt(0)}
              </div>
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
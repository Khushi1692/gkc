import customer1 from "@/assets/customer-1.png";
import customer2 from "@/assets/customer-2.png";
import customer3 from "@/assets/customer-3.png";

const reviews = [
  {
    name: "Sarah M.",
    review: "The burger was amazing! Best I've had in a long time.",
    image: customer1,
  },
  {
    name: "David L.",
    review: "The pasta was so creamy and flavorful. Will definitely order again.",
    image: customer2,
  },
  {
    name: "Emily R.",
    review: "The fries were perfectly crispy and seasoned. Highly recommend!",
    image: customer3,
  },
];

const CustomerReviews = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-secondary">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">{review.name}</h3>
            <p className="text-muted-foreground italic">"{review.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
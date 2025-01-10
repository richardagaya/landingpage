import React from "react";

const testimonials = [
  {
    name: "Kat Park",
    position: "Salon Giselle",
    text: "Everything I need to run and market my business in one central place. Even my tax reporting! You can't find another service out there that does it all for you.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Megan Duchi",
    position: "The Last Tangle",
    text: "You have been the most helpful salon software team ever. You’re awesome ♥.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Aikisha Boyd",
    position: "Xtreme Lashes Stylist",
    text: "I am so grateful for your scheduling system. I never overbook myself and my clients love the reminders!",
    image: "https://via.placeholder.com/100",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-darkblue py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          What our clients say⭐ Hear from the winners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 text-lg italic mb-6">“{testimonial.text}”</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 bg-blue-100 rounded-full transform -translate-y-4 -translate-x-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

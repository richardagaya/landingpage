// components/HeroSection.tsx

import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-hero via-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 space-y-8 md:space-y-0">
        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Learn from the best <br /> coaches in the industry
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Learn from a team of qualified coaches to help you achieve your goals
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md shadow-md hover:bg-indigo-50 transition">
              Join us
            </button>
          </div>
        </div>

        {/* Coach Image */}
        <div className="md:w-1/2 relative">
          <Image
            src="/person2.png" // Replace with your coach's image
            alt="Coach"
            width={500}
            height={500}
            className="rounded-full shadow-lg object-cover z-10"
          />
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-indigo-600 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

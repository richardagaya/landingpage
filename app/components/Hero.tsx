// components/HeroSection.tsx

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-hero via-middle to-lightblue text-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 space-y-8 md:space-y-0">
        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Get your path today <br /> to a successful business!
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Chosing the right industry and business model BEFORE you embark on the adventure of developing your income skills  will save you months and YEARS! 
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/Quiz" passHref>
              <button className="px-6 py-3 bg-gold text-hero font-semibold rounded-md shadow-md hover:bg-yellow-500 transition">
                Take the skills test
              </button>
            </Link>
          </div>
        </div>

        {/* Coach Image */}
        <div className="md:w-1/2 relative">
          <Image
            src="/file.jpg" // Replace with your coach's image
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

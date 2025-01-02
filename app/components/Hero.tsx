import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-black text-center py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src="/images/left-person.png" // Replace with your actual image path
            alt="Left Person"
            className="w-full h-auto"
          />
        </div>

        {/* Center Content */}
        <div className="md:col-span-1 text-center">
          <h1 className="text-4xl font-extrabold text-gold leading-tight mb-4">
            DO YOU WANT TO SCALE YOUR BUSINESS?
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Learn from the team that has built a portfolio of over <span className="text-gold">$500M+</span> in
            less than 4 years.
          </p>
          <Link href="./Quiz">
            <button className="bg-gold text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition-all">
              GET MY CUSTOMIZED ROADMAP
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="hidden md:block">
          <img
            src="/images/right-person.png" // Replace with your actual image path
            alt="Right Person"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

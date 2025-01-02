import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h2>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
          {/* Description Section */}
          <div className="lg:w-1/2 text-gray-600 mb-8 lg:mb-0">
            <p className="text-lg leading-relaxed mb-4">
              We are a dedicated team passionate about helping businesses thrive
              and scale. With years of experience and a track record of success,
              we specialize in providing solutions that truly make an impact.
            </p>
            <p className="text-lg leading-relaxed">
              Watch the video below to learn more about our mission, values, and
              how we’ve helped countless businesses achieve their goals.
            </p>
          </div>

          {/* YouTube Video Section */}
          <div className="lg:w-1/2">
             <iframe
                  className="w-full h-72 sm:h-96 lg:h-[500px] rounded-lg shadow-lg"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                         title="About Us Video"
                             frameBorder="0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>                 </iframe>
</div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;

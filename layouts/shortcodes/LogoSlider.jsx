import React from "react";
import ImageFallback from "@layouts/components/ImageFallback";

const clientLogos = [
  { src: "/images/Retrocausal_Logo.png", alt: "Retrocausal" },
  { src: "/images/CloudClif_Logo.png", alt: "CloudClif" },
  { src: "/images/Eusopht_Greyscale_Logo.png", alt: "EuSopht" },
  { src: "/images/Aciano_Logo.png", alt: "Aciano" },
  { src: "/images/Mazik_Logo.png", alt: "Mazik Global" },
  { src: "/images/Calvence_Logo.png", alt: "Calvence" },
  { src: "/images/Brothers_Pizza_Logo.png", alt: "Brothers Pizza" },
  { src: "/images/Event_Aroma_Logo.png", alt: "Event Aroma" },
  { src: "/images/ITUMZ_Logo.png", alt: "ITUMZ" },
  { src: "/images/Salmis_Cuisine_Logo.png", alt: "Salmis Cuisine" },
  { src: "/images/Untitled design (1).png", alt: "Wajeeha Tutors" },
  { src: "/images/Untitled design (2).png", alt: "Wajeeha Tutors" },
  { src: "/images/Untitled design (10).png", alt: "Wajeeha Tutors" },
  { src: "/images/HTL_Logo.png", alt: "HTL" },
  { src: "/images/PLC-Training-Center-Logo.png", alt: "PLC Training Center" }
];

const LogoSlider = () => {
  return (
    <div className="w-full overflow-hidden mt-8 mb-16 relative group">
      {/* Gradient masks for smooth fading at the edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-body dark:from-darkmode-body to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-body dark:from-darkmode-body to-transparent z-10 pointer-events-none"></div>

      {/* Slider track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center space-x-12 sm:space-x-20 px-8">
        {[...clientLogos, ...clientLogos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
            <ImageFallback
              src={logo.src}
              alt={logo.alt || "Client Logo"}
              width={120}
              height={60}
              className="object-contain h-10 sm:h-16 w-auto mix-blend-multiply dark:mix-blend-screen"
            />
          </div>
        ))}
      </div>
      
      {/* Custom styles for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;

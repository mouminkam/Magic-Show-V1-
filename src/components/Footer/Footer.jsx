"use client";
import FooterBrand from "./_components/FooterBrand";
import FooterContact from "./_components/FooterContact";
import FooterInstagram from "./_components/FooterInstagram";
import FooterBackToTop from "./_components/FooterBackToTop";

export default function Footer() {
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-white relative py-16 px-8 lg:px-0 border-t border-gray-200">
        {/* Side Labels */}
        <span className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-900 text-lg opacity-50 tracking-widest whitespace-nowrap">
          FREE SHIPPING
        </span>

        <span className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-900 text-lg opacity-50 tracking-widest whitespace-nowrap">
          24H SUPPORT
        </span>

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Brand */}
            <FooterBrand />

            {/* Middle Column - Contact */}
            <FooterContact />

            {/* Right Column - Instagram */}
            <FooterInstagram />
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <FooterBackToTop />
    </>
  );
}


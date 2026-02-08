"use client";

import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

/**
 * WhyChooseUs Component
 * Displays key selling points and trust factors
 * @param {Object} props - Component props
 * @param {Array} props.features - Array of feature objects
 */
export default function WhyChooseUs({ features = [] }) {
  // Icon mapping for string-based icons from API
  const iconMap = {
    Truck,
    Shield,
    RotateCcw,
    Headphones,
    HeadphonesIcon: Headphones,
  };

  const defaultFeatures = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $100",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "100% authentic products with warranty",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy, hassle-free",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
  ];

  const featuresToRender = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            We're committed to providing the best shopping experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {featuresToRender.map((feature, index) => {
            // Handle both component and string-based icon references
            let IconComponent = feature.icon;
            if (typeof IconComponent === "string") {
              IconComponent = iconMap[IconComponent] || Truck;
            } else if (!IconComponent) {
              IconComponent = Truck;
            }
            
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <IconComponent className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


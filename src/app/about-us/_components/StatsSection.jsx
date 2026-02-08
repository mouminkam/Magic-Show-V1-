"use client";

import { Users, Instagram, ShoppingBag, Award, Star } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/**
 * Icon mapping function
 * Maps icon name strings to Lucide React icon components
 */
const getIconComponent = (iconName) => {
  const iconMap = {
    Users,
    Instagram,
    ShoppingBag,
    Award,
    Star,
  };
  return iconMap[iconName] || Users; // Default to Users if icon not found
};

/**
 * StatsSection Component
 * Displays statistics with animated counters
 * @param {Object} props - Component props
 * @param {Array} props.stats - Array of statistics objects
 * @param {string} props.stats[].icon - Icon name (Users, Instagram, ShoppingBag)
 * @param {string} props.stats[].title - Stat title
 * @param {number} props.stats[].value - Stat value
 * @param {string} props.stats[].suffix - Value suffix (k, etc.)
 */
export default function StatsSection({ stats = [] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Default stats if not provided
  const defaultStats = [
    {
      icon: "Users",
      title: "SUBSCRIBERS",
      value: 198.9,
      suffix: "k",
    },
    {
      icon: "Instagram",
      title: "INSTAGRAM",
      value: 201.5,
      suffix: "k",
    },
    {
      icon: "ShoppingBag",
      title: "PIECES SOLD",
      value: 23.741,
      suffix: "k",
    },
  ];

  const statsData = stats.length > 0 ? stats : defaultStats;

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-gray-100 mt-5 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center">
          {statsData.map((stat, index) => {
            const Icon = getIconComponent(stat.icon);
            return (
              <div
                key={index}
                className="group hover:transform hover:scale-105 transition-transform duration-300 min-w-0"
              >
                <Icon className="w-12 h-12 text-gray-700 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-normal text-gray-700 uppercase tracking-widest mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-gray-700">
                  {stat.title}
                </h3>
                <span className="text-4xl md:text-4xl lg:text-6xl font-bold text-gray-700 block">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      decimals={stat.value % 1 !== 0 ? 3 : 0}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "../../../components/Button";

/**
 * AboutDescription Component
 * Displays about us description with image, text, and features
 * @param {Object} props - Component props
 * @param {Object} props.data - About description data
 * @param {string} props.data.title - Section title
 * @param {string} props.data.description - Description text
 * @param {string} props.data.image - Image path
 * @param {Array} props.data.features - Array of feature strings
 * @param {string} props.data.buttonText - Button text
 */
export default function AboutDescription({ data }) {
  // Default values if data is not provided
  const defaultData = {
    title: "LOVE JEWELRY",
    description: "Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim pharetra, erat sed fermentum feugiat. Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim pharetra, erat sed fermentum feugiat. Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim pharetra, erat sed fermentum feugiat.",
    image: "/images/img20.jpg",
    features: [
      "Pharetra, erat sed fermentum feugiat.",
      "Spendisse in orci enim pharetra, erat sed fermentum.",
      "Pharetra, erat sed fermentum feugiat.",
    ],
    buttonText: "Read more",
  };

  const aboutData = data || defaultData;

  // Validate image source - use default if empty or invalid
  const imageSrc = aboutData.image && aboutData.image.trim() !== '' 
    ? aboutData.image 
    : defaultData.image;

  // Check if it's an external URL
  const isExternalImage = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image with border effect */}
          <div className="relative lg:w-1/2">
            <div className="relative z-10">
              <Image
                src={imageSrc}
                alt="About us jewelry collection"
                width={520}
                height={450}
                className="w-full h-auto object-cover aspect-[520/450] min-h-[200px] sm:min-h-[280px] md:min-h-[480px] lg:min-h-[380px] xl:min-h-[450px]"
                unoptimized={isExternalImage}
              />
            </div>
            <div className="absolute border-4 border-gray-600 z-0 w-full h-full lg:left-10 lg:-right-10 lg:top-10 lg:-bottom-10 max-lg:left-5 max-lg:right-0 max-lg:top-5 max-lg:bottom-0"></div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 lg:ml-20 max-lg:mt-10 max-lg:flex max-lg:flex-col max-lg:items-center">
            {aboutData.subtitle && (
              <span className="text-lg font-normal text-gray-500 uppercase tracking-widest block mb-4">
                {aboutData.subtitle}
              </span>
            )}
            <h2 className="text-3xl font-normal text-gray-700 uppercase tracking-widest inline relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-2 after:w-full after:h-1 after:bg-gray-600">
              {aboutData.title}
            </h2>

            <p className="text-gray-600 text-lg leading-8 my-8">
              {aboutData.description}
            </p>

            <ul className="space-y-3 mb-10 pl-6 max-lg:self-start max-lg:ml-5">
              {aboutData.features.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 text-lg relative before:content-['•'] before:absolute before:-left-6 before:text-gray-600 before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Button
              variant="secondary"
              size="md"
              className="flex items-center gap-2 group"
            >
              {aboutData.buttonText}
              <ArrowRight className="w-5 h-5 ml-2  transition-transform duration-300 group-hover:animate-[moveRight_0.6s_ease-in-out_infinite]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


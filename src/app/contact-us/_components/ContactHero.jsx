import HeroBanner from "../../../components/HeroBanner";

/**
 * ContactHero Component
 * Displays hero banner for contact page
 * @param {Object} props - Component props
 * @param {Object} props.heroData - Hero banner data
 * @param {string} props.heroData.title - Banner title
 * @param {string} props.heroData.backgroundImage - Background image path
 * @param {string} props.heroData.leftBadge - Left badge text (optional)
 * @param {string} props.heroData.rightBadge - Right badge text (optional)
 */
export default function ContactHero({ heroData }) {
  // Default values if data is not provided
  const defaultData = {
    title: "CONTACT US",
    backgroundImage: "/images/img04.jpg",
    leftBadge: "SALE OF 50%",
    rightBadge: "TRENDS FOR 2024",
  };

  const heroBannerData = heroData || defaultData;

  return (
    <HeroBanner
      title={heroBannerData.title}
      backgroundImage={heroBannerData.backgroundImage}
      leftBadge={heroBannerData.leftBadge}
      rightBadge={heroBannerData.rightBadge}
      showGradient
    />
  );
}


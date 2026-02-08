/**
 * HeroBanner Component
 * Reusable banner component with title and badges
 * Supports both individual props and bannerData object for backward compatibility
 * @param {Object} props - Component props
 * @param {string} props.title - Banner title (or from bannerData)
 * @param {string} props.backgroundImage - Background image URL (or from bannerData)
 * @param {string} props.leftBadge - Left badge text (or from bannerData)
 * @param {string} props.rightBadge - Right badge text (or from bannerData)
 * @param {Object} props.bannerData - Optional banner data object (overrides individual props if provided)
 * @param {boolean} props.showGradient - Show gradient overlay (default: false)
 * @param {string} props.minHeight - Minimum height value (default: "450px")
 * @param {string} props.marginBottom - Margin bottom class (default: null)
 */
export default function HeroBanner({
  title,
  backgroundImage = "/images/img04.jpg",
  leftBadge = "SALE OF 50%",
  rightBadge = "TRENDS FOR 2024",
  bannerData = null,
  showGradient = false,
  minHeight = "450px",
  marginBottom = null,
}) {
  // Extract values from bannerData if provided, otherwise use individual props
  const finalTitle = bannerData?.title || title;
  const finalBackgroundImage = bannerData?.backgroundImage || backgroundImage;
  const finalLeftBadge = bannerData?.leftBadge || leftBadge;
  const finalRightBadge = bannerData?.rightBadge || rightBadge;

  // Build section classes
  const sectionClasses = [
    "relative w-full mt-0 flex flex-col items-center justify-center",
    showGradient ? "" : "py-[112px]",
    marginBottom || "",
    "overflow-x-hidden",
  ].filter(Boolean).join(" ");

  return (
    <section 
      className={sectionClasses}
      style={{
        backgroundImage: `url(${finalBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight,
      }}
    >

      {/* Gradient Overlay - only shown if showGradient is true */}
      {showGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_20%,_rgba(0,0,0,1)_100%)] z-[5] pointer-events-none"></div>
      )}

      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="text-center text-white">
          <h1
            className="
              relative text-[40px] sm:text-[50px] lg:text-[70px] font-bold mb-4 tracking-widest inline-block p-15 
              before:content-[''] before:absolute before:z-1
              before:left-15 before:top-2 before:right-15
              before:border-t-[9px] before:border-x-[9px] before:border-white before:border-solid
              before:h-[50px]
              after:content-[''] after:absolute after:z-1
              after:left-15 after:bottom-0 after:right-15
              after:border-b-[9px] after:border-x-[9px] after:border-white after:border-solid
              after:h-[50px]"
          >
            {finalTitle}
          </h1>
        </div>
      </div>

      {/* Right Badge */}
      <span
        className="
    block text-[18px] leading-[20px] text-white
    absolute rotate-90
    lg:right-[-40px] lg:top-1/2
    max-lg:top-4 max-lg:right-auto max-lg:left-1/2 max-lg:translate-x-[-50%] max-lg:rotate-0 max-lg:mt-10 max-lg:max-w-full max-lg:px-4
    tracking-[3px] [word-spacing:4px] uppercase mr-[10px] opacity-50 whitespace-nowrap z-20
  "
      >
        {finalRightBadge}
      </span>

      {/* Left Badge */}
      <span
        className="
    block text-[18px] leading-[20px] text-white
    rotate-90 absolute
    lg:left-[-40px] lg:top-1/2
    max-lg:bottom-4 max-lg:left-1/2 max-lg:translate-x-[-50%] max-lg:top-auto max-lg:rotate-0 max-lg:mb-10 max-lg:max-w-full max-lg:px-4
    tracking-[3px] [word-spacing:4px] uppercase ml-[10px] opacity-50 whitespace-nowrap z-20
  "
      >
        {finalLeftBadge}
      </span>
    </section>
  );
}

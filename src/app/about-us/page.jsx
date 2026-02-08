import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { getLanguage } from "../../lib/getLanguage";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";
import { t } from "../../locales/i18n/getTranslation";
import { createServerAxios } from "../../api/config/serverAxios";

export const metadata = {
  title: 'About Us - Magic Show',
  description: 'Learn about Magic Show, our mission, team and commitment to providing premium fashion products and exceptional customer service.',
  keywords: ['about us', 'our story', 'team', 'company', 'fashion brand'],
  openGraph: {
    title: 'About Us - Magic Show',
    description: 'Learn about our mission and team',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Lazy load AboutUsSection with dynamic import
const AboutUsSection = dynamic(
  () => import("./_components/AboutUsSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true, // Enable SSR for this component
  }
);

// Functions that accept serverAxios (no cookies inside cache). Call createServerAxios() outside cache and pass here.
async function getTeamMembersWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/about/team-members");
    return data.data || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

async function getTestimonialsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/about/testimonials");
    return data.data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

async function getAboutDescriptionWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/about/description");
    return data.data || {
      title: "LOVE JEWELRY",
      description: "",
      image: "/images/img20.jpg",
      features: [],
      buttonText: "Read more",
    };
  } catch (error) {
    console.error('Error fetching about description:', error);
    return {
      title: "LOVE JEWELRY",
      description: "",
      image: "/images/img20.jpg",
      features: [],
      buttonText: "Read more",
    };
  }
}

async function getStatsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/about/stats");
    return data.data || [];
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

async function getAboutHeroWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/about/hero");
    if (data?.success && data?.data) return data.data;
    return fallbackAboutHero();
  } catch (error) {
    console.error('Error fetching about hero:', error);
    return fallbackAboutHero();
  }
}

function fallbackAboutHero() {
  return {
    title: "ABOUT US",
    backgroundImage: "/images/img04.jpg",
    leftBadge: "SALE OF 50%",
    rightBadge: "TRENDS FOR 2024",
  };
}

export default async function AboutUsPage() {
  const lang = await getLanguage();
  const serverAxios = await createServerAxios();

  // Fetch data on the server (cached; revalidate every 60s). Axios created outside cache to avoid cookies() in cache scope.
  const [teamMembers, testimonials, aboutDescription, stats, aboutHero] = await Promise.all([
    cachedServerApi(["about", "team-members", lang], () => getTeamMembersWithAxios(serverAxios), CACHE_REVALIDATE, ["about"]),
    cachedServerApi(["about", "testimonials", lang], () => getTestimonialsWithAxios(serverAxios), CACHE_REVALIDATE, ["about"]),
    cachedServerApi(["about", "description", lang], () => getAboutDescriptionWithAxios(serverAxios), CACHE_REVALIDATE, ["about"]),
    cachedServerApi(["about", "stats", lang], () => getStatsWithAxios(serverAxios), CACHE_REVALIDATE, ["about"]),
    cachedServerApi(["about", "hero", lang], () => getAboutHeroWithAxios(serverAxios), CACHE_REVALIDATE, ["about"]),
  ]);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-screen" />}
        >
          <AboutUsSection
            teamMembers={teamMembers}
            testimonials={testimonials}
            aboutDescription={aboutDescription}
            stats={stats}
            aboutHero={aboutHero}
            className="overflow-hidden"
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

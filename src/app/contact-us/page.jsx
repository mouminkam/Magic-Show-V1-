import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLanguage } from "../../lib/getLanguage";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { createServerAxios } from "../../api/config/serverAxios";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";

export const metadata = {
  title: 'Contact Us - Magic Show',
  description: 'Get in touch with Magic Show. Find our location, contact details and send us a message. We are here to help.',
  keywords: ['contact', 'customer service', 'location', 'support', 'get in touch'],
  openGraph: {
    title: 'Contact Us - Magic Show',
    description: 'Get in touch with us',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ContactSection = dynamic(
  () => import("./_components/ContactSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true,
  }
);

/** Uses passed-in axios (no cookies inside cache). Call createServerAxios() outside cache and pass here. */
async function getContactHeroWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/contact/hero");
    if (data?.success && data?.data) return data.data;
    return fallbackHero();
  } catch (error) {
    console.error("Error fetching contact hero:", error);
    return fallbackHero();
  }
}

function fallbackHero() {
  return {
    title: "CONTACT US",
    subtitle: "We're Here to Help",
    backgroundImage: "/images/img04.jpg",
    leftBadge: null,
    rightBadge: null,
  };
}

/** Uses passed-in axios (no cookies inside cache). */
async function getContactMapWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/contact/map");
    if (data?.success && data?.data) return data.data;
    return fallbackMap();
  } catch (error) {
    console.error("Error fetching contact map:", error);
    return fallbackMap();
  }
}

function fallbackMap() {
  return {
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.0!2d35.5!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzAwLjAiTiAzNcKwMzAnMDAuMCJF!5e0!3m2!1sen!2slb!4v1234567890",
  };
}

/** Uses passed-in axios (no cookies inside cache). */
async function getContactDetailsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/contact/details");
    if (data?.success && data?.data) return data.data;
    return fallbackDetails();
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return fallbackDetails();
  }
}

function fallbackDetails() {
  return {
    title: "CONTACT DETAIL",
    address: "",
    email: "",
    phone: "",
    fax: "",
    aboutTitle: "ABOUT US",
    aboutText: "",
  };
}

export default async function ContactUsPage() {
  const lang = await getLanguage();
  const serverAxios = await createServerAxios();

  const [contactHero, contactMap, contactDetails] = await Promise.all([
    cachedServerApi(["contact", "hero", lang], () => getContactHeroWithAxios(serverAxios), CACHE_REVALIDATE, ["contact"]),
    cachedServerApi(["contact", "map", lang], () => getContactMapWithAxios(serverAxios), CACHE_REVALIDATE, ["contact"]),
    cachedServerApi(["contact", "details", lang], () => getContactDetailsWithAxios(serverAxios), CACHE_REVALIDATE, ["contact"]),
  ]);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
          <ContactSection
            contactHero={contactHero}
            contactMap={contactMap}
            contactDetails={contactDetails}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

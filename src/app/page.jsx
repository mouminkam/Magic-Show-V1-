import HomePage from "./home/page";

export const metadata = {
  title: 'Magic Show - Premium Shoes & Accessories',
  description: 'Discover the finest collection of shoes, heels, boots, sandals and accessories. Shop the latest trends and timeless classics at Magic Show.',
  keywords: ['shoes', 'heels', 'boots', 'sandals', 'accessories', 'fashion', 'online shopping'],
  openGraph: {
    title: 'Magic Show - Premium Shoes & Accessories',
    description: 'Discover the finest collection of shoes and accessories',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magic Show - Premium Shoes & Accessories',
    description: 'Discover the finest collection of shoes and accessories',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <HomePage />;
}

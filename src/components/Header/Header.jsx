"use client";
import { useState, useRef, useEffect } from "react";
import { getLanguageClient } from "../../lib/getLanguageClient";
import { t } from "../../locales/i18n/getTranslation";
import HeaderLogo from "./_components/HeaderLogo";
import HeaderNavigation from "./_components/HeaderNavigation";
import HeaderActions from "./_components/HeaderActions";
import HeaderSearch from "./_components/HeaderSearch";
import HeaderMobileMenu from "./_components/HeaderMobileMenu";

export default function Header({ lang: initialLang }) {
  // Use initialLang from server during SSR/initial render to prevent hydration mismatch
  // Fallback to getLanguageClient() for backward compatibility if prop is not provided
  const [lang, setLang] = useState(initialLang || getLanguageClient());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Update lang when cookies change (client-side only, after hydration)
  useEffect(() => {
    const clientLang = getLanguageClient();
    if (clientLang !== lang) {
      setLang(clientLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once after mount

  // Navigation items with proper links and translations
  const navItems = [
    { name: t(lang, "home"), key: "home", href: "/" },
    { name: t(lang, "shop"), key: "shop", href: "/shop" },
    { name: t(lang, "stores"), key: "stores", href: "/stores" },
    { name: t(lang, "blog"), key: "blog", href: "/blog" },
    { name: t(lang, "contact"), key: "contact", href: "/contact-us" },
    { name: t(lang, "about"), key: "about", href: "/about-us" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Header with sticky positioning */}
      <header
        ref={headerRef}
        className="sticky top-0 w-full h-20 bg-white z-50 border-b border-gray-100 shadow-sm"
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full lg:mx-12">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <HeaderLogo />
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex flex-1 justify-center">
              <HeaderNavigation navItems={navItems} />
            </div>

            {/* Right Side Icons */}
            <div className="flex-shrink-0">
              <HeaderActions
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                setSearchOpen={setSearchOpen}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Sidebar */}
      <HeaderMobileMenu
        isOpen={mobileMenuOpen}
        navItems={navItems}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search Modal */}
      <HeaderSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

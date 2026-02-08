"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigation({ navItems }) {
  const pathname = usePathname();

  // Check if nav item is active
  const isActive = (item) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(item.href);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="flex items-center gap-8 xl:gap-10"
    >
      {navItems.map((item) => {
        const active = isActive(item);
        return (
          <div key={item.key || item.name} className="relative group">
            <Link
              href={item.href}
              className={`relative text-sm font-medium uppercase tracking-wide transition-all duration-300 pb-1  rounded
                 ${
                active
                  ? "text-orange-500"
                  : "text-gray-900 hover:text-orange-500"
              }`}
              aria-label={`Navigate to ${item.name}`}
              aria-current={active ? "page" : undefined}
            >
              {item.name}
              {/* Active underline - always visible when active */}
              {active && (
                <span className="absolute -bottom-1 left-0 h-0.5 bg-orange-500 w-full" />
              )}
              {/* Hover underline effect - only on hover when not active */}
              {!active && (
                <span className="absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 w-0 group-hover:w-full" />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}


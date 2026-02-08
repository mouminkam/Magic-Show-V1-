"use client";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderMobileMenu({
  isOpen,
  navItems,
  onClose,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[60] shadow-2xl overflow-y-auto"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="min-h-full">
              <div className="min-h-full p-6">
                {/* Top Section - Logo and Close Button */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  className="mb-6 flex justify-between items-center"
                >
                  {/* Logo */}
                  <Link href="/" onClick={onClose}>
                    <Image
                      src="/images/logo.png"
                      alt="Magic Show Logo"
                      width={150}
                      height={60}
                      className="w-auto h-10 object-contain"
                      quality={90}
                      priority
                      loading="eager"
                      sizes="150px"
                    />
                  </Link>

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                    aria-label="Close menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Navigation Items */}
                <motion.nav
                  role="navigation"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-4 py-4"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key || item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.4, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        className="block text-base font-medium uppercase py-3 text-gray-900 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
                        onClick={onClose}
                        aria-label={`Navigate to ${item.name}`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

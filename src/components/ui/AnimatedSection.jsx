"use client";
import { motion } from "framer-motion";

const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      // 1. استخدام opacity و y فقط (أخف بكتير من x بالرندرة)
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      // 2. تفعيل الأنميشن مرة واحدة فقط عند الظهور
      viewport={{ once: true, margin: "-50px" }}
      // 3. استخدام الانتقال المباشر بدون تعقيد الـ controls
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Cubic-bezier لسلاسة عالمية
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
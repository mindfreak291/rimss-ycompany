'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OfferBannerProps {
  title?: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
}

export const OfferBanner: React.FC<OfferBannerProps> = ({
  title = '🎉 Winter Sale - Up to 50% Off!',
  subtitle = 'Limited time offer on selected items',
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full py-4 ${
        isDark ? 'bg-gradient-to-r from-primary-600 to-primary-800' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
      }`}
    >
      <div className="container-custom text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-sm md:text-base ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};
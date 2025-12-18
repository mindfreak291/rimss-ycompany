'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { hideNotification } from '@/lib/store/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

export const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification?.show) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <div
          className={`${bgColors[notification.type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between`}
        >
          <p className="font-medium">{notification.message}</p>
          <button
            onClick={() => dispatch(hideNotification())}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
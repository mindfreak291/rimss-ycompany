'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store';
import { registerPlugin } from '@/lib/store/pluginsSlice';
import { OfferBanner } from '@/components/plugins';

export const usePlugins = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Register OfferBanner plugin
    dispatch(
      registerPlugin({
        id: 'offer-banner',
        name: 'Offer Banner',
        component: OfferBanner,
        config: {
          enabled: true,
          position: 'top',
          theme: 'dark',
          title: '🎉 Winter Sale - Up to 50% Off!',
          subtitle: 'Limited time offer on selected items',
        },
      })
    );
  }, [dispatch]);
};
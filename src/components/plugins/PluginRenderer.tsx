'use client';

import React from 'react';
import { useAppSelector } from '@/lib/store';

interface PluginRendererProps {
  position: 'top' | 'middle' | 'bottom';
}

export const PluginRenderer: React.FC<PluginRendererProps> = ({ position }) => {
  const { plugins, enabled } = useAppSelector((state) => state.plugins);

  const activePlugins = plugins.filter(
    (plugin) =>
      enabled[plugin.id] &&
      plugin.config.enabled &&
      plugin.config.position === position
  );

  if (activePlugins.length === 0) return null;

  return (
    <div className="w-full">
      {activePlugins.map((plugin) => {
        const Component = plugin.component;
        return <Component key={plugin.id} {...plugin.config} />;
      })}
    </div>
  );
};
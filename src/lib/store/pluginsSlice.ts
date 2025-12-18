import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plugin, PluginConfig } from '@/types';

interface PluginsState {
  plugins: Plugin[];
  enabled: Record<string, boolean>;
}

const initialState: PluginsState = {
  plugins: [],
  enabled: {},
};

const pluginsSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    registerPlugin: (state, action: PayloadAction<Plugin>) => {
      const existingIndex = state.plugins.findIndex(
        (p) => p.id === action.payload.id
      );
      
      if (existingIndex >= 0) {
        state.plugins[existingIndex] = action.payload;
      } else {
        state.plugins.push(action.payload);
      }
      
      state.enabled[action.payload.id] = action.payload.config.enabled;
    },

    unregisterPlugin: (state, action: PayloadAction<string>) => {
      state.plugins = state.plugins.filter((p) => p.id !== action.payload);
      delete state.enabled[action.payload];
    },

    togglePlugin: (state, action: PayloadAction<string>) => {
      const plugin = state.plugins.find((p) => p.id === action.payload);
      if (plugin) {
        plugin.config.enabled = !plugin.config.enabled;
        state.enabled[action.payload] = plugin.config.enabled;
      }
    },

    updatePluginConfig: (
      state,
      action: PayloadAction<{ id: string; config: Partial<PluginConfig> }>
    ) => {
      const plugin = state.plugins.find((p) => p.id === action.payload.id);
      if (plugin) {
        plugin.config = { ...plugin.config, ...action.payload.config };
      }
    },
  },
});

export const {
  registerPlugin,
  unregisterPlugin,
  togglePlugin,
  updatePluginConfig,
} = pluginsSlice.actions;

export default pluginsSlice.reducer;
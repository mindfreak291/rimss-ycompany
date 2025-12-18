import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilter } from '@/types';
import { mockProducts } from '@/mocks/products';

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  filter: ProductFilter;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  allProducts: mockProducts,
  filteredProducts: mockProducts,
  filter: {},
  isLoading: false,
  error: null,
};

const applyFilters = (products: Product[], filter: ProductFilter): Product[] => {
  return products.filter((product) => {
    // Category filter
    if (filter.category && filter.category !== 'All' && product.category !== filter.category) {
      return false;
    }

    // Price range filter
    const price = product.discountPrice || product.price;
    if (filter.minPrice !== undefined && price < filter.minPrice) {
      return false;
    }
    if (filter.maxPrice !== undefined && filter.maxPrice !== Infinity && price > filter.maxPrice) {
      return false;
    }

    // Color filter
    if (filter.color && filter.color !== 'All') {
      const hasColor = product.colors.some(
        (c) => c.toLowerCase().includes(filter.color!.toLowerCase())
      );
      if (!hasColor) return false;
    }

    // Discount filter
    if (filter.discountOnly && !product.discountPrice) {
      return false;
    }

    // Search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      
      if (!matchesName && !matchesDescription && !matchesCategory) {
        return false;
      }
    }

    return true;
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredProducts = applyFilters(state.allProducts, state.filter);
    },

    clearFilters: (state) => {
      state.filter = {};
      state.filteredProducts = state.allProducts;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filter.searchQuery = action.payload;
      state.filteredProducts = applyFilters(state.allProducts, state.filter);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFilter,
  clearFilters,
  setSearchQuery,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
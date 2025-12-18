import productsReducer, {
    setFilter,
    clearFilters,
    setSearchQuery,
  } from '../store/productsSlice';
  import { Product } from '@/types';
  
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Red Sweater',
      description: 'Warm winter sweater',
      price: 100,
      discountPrice: 80,
      category: 'Sweaters',
      colors: ['Red', 'Blue'],
      sizes: ['M', 'L'],
      images: [],
      inStock: true,
      featured: true,
      rating: 4.5,
      reviews: 10,
    },
    {
      id: '2',
      name: 'Blue Blazer',
      description: 'Professional blazer',
      price: 200,
      category: 'Blazers',
      colors: ['Blue', 'Black'],
      sizes: ['M', 'L', 'XL'],
      images: [],
      inStock: true,
      featured: false,
      rating: 4.0,
      reviews: 5,
    },
    {
      id: '3',
      name: 'Black Trousers',
      description: 'Formal trousers',
      price: 150,
      discountPrice: 120,
      category: 'Trousers',
      colors: ['Black', 'Gray'],
      sizes: ['30', '32', '34'],
      images: [],
      inStock: true,
      featured: false,
      rating: 4.8,
      reviews: 20,
    },
  ];
  
  describe('Products Slice - Filter Logic Tests', () => {
    const initialState = {
      allProducts: mockProducts,
      filteredProducts: mockProducts,
      filter: {},
      isLoading: false,
      error: null,
    };
  
    test('should filter by category', () => {
      const state = productsReducer(
        initialState,
        setFilter({ category: 'Sweaters' })
      );
  
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1');
      expect(state.filter.category).toBe('Sweaters');
    });
  
    test('should filter by price range', () => {
        const state = productsReducer(
          initialState,
          setFilter({ minPrice: 100, maxPrice: 150 })
        );
    
        // Product 1: discountPrice 80 (excluded, below min)
        // Product 2: price 200 (excluded, above max)
        // Product 3: discountPrice 120 (included, within range)
        expect(state.filteredProducts).toHaveLength(1);
        expect(state.filteredProducts[0].id).toBe('3');
      });
  
    test('should filter by color', () => {
      const state = productsReducer(initialState, setFilter({ color: 'Red' }));
  
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1');
    });
  
    test('should filter for discounted products only', () => {
      const state = productsReducer(
        initialState,
        setFilter({ discountOnly: true })
      );
  
      expect(state.filteredProducts).toHaveLength(2);
      expect(
        state.filteredProducts.every((p) => p.discountPrice !== undefined)
      ).toBe(true);
    });
  
    test('should handle search query', () => {
      const state = productsReducer(initialState, setSearchQuery('blazer'));
  
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('2');
      expect(state.filter.searchQuery).toBe('blazer');
    });
  
    test('should handle search query by description', () => {
      const state = productsReducer(initialState, setSearchQuery('winter'));
  
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1');
    });
  
    test('should apply multiple filters simultaneously', () => {
      let state = productsReducer(initialState, setFilter({ category: 'All' }));
      state = productsReducer(state, setFilter({ color: 'Blue' }));
      state = productsReducer(state, setFilter({ minPrice: 0, maxPrice: 150 }));
  
      // Should find products with Blue color and price <= 150
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1'); // Red Sweater has Blue color and discounted price 80
    });
  
    test('should clear all filters', () => {
      let state = productsReducer(
        initialState,
        setFilter({ category: 'Sweaters', color: 'Red' })
      );
      state = productsReducer(state, clearFilters());
  
      expect(state.filteredProducts).toHaveLength(3);
      expect(state.filter).toEqual({});
    });
  
    test('should return empty array when no products match filters', () => {
      const state = productsReducer(
        initialState,
        setFilter({ category: 'NonExistent' })
      );
  
      expect(state.filteredProducts).toHaveLength(0);
    });
  
    test('should handle "All" category as no filter', () => {
      const state = productsReducer(initialState, setFilter({ category: 'All' }));
  
      expect(state.filteredProducts).toHaveLength(3);
    });
  
    test('should handle "All" color as no filter', () => {
      const state = productsReducer(initialState, setFilter({ color: 'All' }));
  
      expect(state.filteredProducts).toHaveLength(3);
    });
  
    test('should filter using actual price when discountPrice exists', () => {
      // Product 1: price 100, discountPrice 80
      // Product 2: price 200, no discount
      // Product 3: price 150, discountPrice 120
      
      const state = productsReducer(
        initialState,
        setFilter({ minPrice: 0, maxPrice: 100 })
      );
  
      // Should include only product 1 (discounted to 80)
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1');
    });
  
    test('should be case-insensitive for search queries', () => {
      const state = productsReducer(initialState, setSearchQuery('SWEATER'));
  
      expect(state.filteredProducts).toHaveLength(1);
      expect(state.filteredProducts[0].id).toBe('1');
    });
  });
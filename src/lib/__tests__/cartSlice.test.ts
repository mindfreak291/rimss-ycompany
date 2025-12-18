import cartReducer, {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } from '../store/cartSlice';
  import { Cart, Product } from '@/types';
  
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    discountPrice: 80,
    category: 'Test',
    colors: ['Red', 'Blue'],
    sizes: ['M', 'L'],
    images: ['test.jpg'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 10,
  };
  
  describe('Cart Slice - Business Logic Tests', () => {
    const initialState: Cart = {
      items: [],
      total: 0,
      itemCount: 0,
    };
  
    test('should handle adding item to empty cart', () => {
      const action = addToCart({
        product: mockProduct,
        quantity: 2,
        selectedColor: 'Red',
        selectedSize: 'M',
      });
  
      const state = cartReducer(initialState, action);
  
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.items[0].selectedColor).toBe('Red');
      expect(state.items[0].selectedSize).toBe('M');
      expect(state.total).toBe(160); // 80 * 2 (discount price)
      expect(state.itemCount).toBe(2);
    });
  
    test('should handle adding same product with different color', () => {
      const stateWithItem: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
        ],
        total: 80,
        itemCount: 1,
      };
  
      const action = addToCart({
        product: mockProduct,
        quantity: 1,
        selectedColor: 'Blue',
        selectedSize: 'M',
      });
  
      const state = cartReducer(stateWithItem, action);
  
      expect(state.items).toHaveLength(2);
      expect(state.total).toBe(160); // 80 * 2
      expect(state.itemCount).toBe(2);
    });
  
    test('should handle adding same product with same color (increase quantity)', () => {
      const stateWithItem: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
        ],
        total: 80,
        itemCount: 1,
      };
  
      const action = addToCart({
        product: mockProduct,
        quantity: 2,
        selectedColor: 'Red',
        selectedSize: 'M',
      });
  
      const state = cartReducer(stateWithItem, action);
  
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3); // 1 + 2
      expect(state.total).toBe(240); // 80 * 3
      expect(state.itemCount).toBe(3);
    });
  
    test('should handle removing item from cart', () => {
      const stateWithItems: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 2,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
          {
            product: { ...mockProduct, id: '2' },
            quantity: 1,
            selectedColor: 'Blue',
            selectedSize: 'L',
          },
        ],
        total: 240,
        itemCount: 3,
      };
  
      const state = cartReducer(stateWithItems, removeFromCart(0));
  
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe('2');
      expect(state.total).toBe(80);
      expect(state.itemCount).toBe(1);
    });
  
    test('should handle updating quantity to zero (removes item)', () => {
      const stateWithItem: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 2,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
        ],
        total: 160,
        itemCount: 2,
      };
  
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ index: 0, quantity: 0 })
      );
  
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
      expect(state.itemCount).toBe(0);
    });
  
    test('should handle updating quantity to positive number', () => {
      const stateWithItem: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 2,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
        ],
        total: 160,
        itemCount: 2,
      };
  
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ index: 0, quantity: 5 })
      );
  
      expect(state.items[0].quantity).toBe(5);
      expect(state.total).toBe(400); // 80 * 5
      expect(state.itemCount).toBe(5);
    });
  
    test('should handle clearing cart', () => {
      const stateWithItems: Cart = {
        items: [
          {
            product: mockProduct,
            quantity: 2,
            selectedColor: 'Red',
            selectedSize: 'M',
          },
        ],
        total: 160,
        itemCount: 2,
      };
  
      const state = cartReducer(stateWithItems, clearCart());
  
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
      expect(state.itemCount).toBe(0);
    });
  
    test('should calculate total using regular price when no discount', () => {
      const productNoDiscount: Product = {
        ...mockProduct,
        discountPrice: undefined,
      };
  
      const action = addToCart({
        product: productNoDiscount,
        quantity: 2,
        selectedColor: 'Red',
        selectedSize: 'M',
      });
  
      const state = cartReducer(initialState, action);
  
      expect(state.total).toBe(200); // 100 * 2 (regular price)
    });
  });
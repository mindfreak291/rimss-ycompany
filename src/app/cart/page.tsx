'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { removeFromCart, updateQuantity } from '@/lib/store/cartSlice';
import { CartItemCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (index: number, quantity: number) => {
    dispatch(updateQuantity({ index, quantity }));
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom text-center">
          <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started!
          </p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <CartItemCard
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                item={item}
                onUpdateQuantity={(quantity) =>
                  handleUpdateQuantity(index, quantity)
                }
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({itemCount})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} fullWidth className="mb-4">
                Proceed to Checkout
              </Button>

              <button
                onClick={() => router.push('/products')}
                className="w-full text-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
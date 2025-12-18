'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/types';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const price = item.product.discountPrice || item.product.price;
  const total = price * item.quantity;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">
          {item.product.name}
        </h3>
        <div className="text-sm text-gray-600 mb-2">
          <p>Color: {item.selectedColor}</p>
          <p>Size: {item.selectedSize}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </div>
          {item.product.discountPrice && (
            <div className="text-sm text-gray-500 line-through">
              ${item.product.price.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Remove item"
        >
          <FiTrash2 className="text-xl" />
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
          <button
            onClick={handleDecrease}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <FiMinus />
          </button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <FiPlus />
          </button>
        </div>

        <div className="text-lg font-bold text-gray-900">
          ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
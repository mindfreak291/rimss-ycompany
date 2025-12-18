'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { addToCart } from '@/lib/store/cartSlice';
import { showNotification } from '@/lib/store/uiSlice';
import { Button, Select, Badge } from '@/components/atoms';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state) => state.products);
  const product = allProducts.find((p) => p.id === params.id);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <Button onClick={() => router.push('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedColor) {
      dispatch(
        showNotification({
          message: 'Please select a color',
          type: 'warning',
        })
      );
      return;
    }

    if (!selectedSize) {
      dispatch(
        showNotification({
          message: 'Please select a size',
          type: 'warning',
        })
      );
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );

    dispatch(
      showNotification({
        message: 'Product added to cart!',
        type: 'success',
      })
    );
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-primary-600"
          >
            Home
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <button
            onClick={() => router.push('/products')}
            className="text-gray-600 hover:text-primary-600"
          >
            Products
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4">
                  <Badge variant="error" className="text-base px-4 py-2">
                    -{discountPercentage}% OFF
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-primary-600'
                        : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${displayPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Category */}
            <div className="mb-6">
              <span className="text-sm text-gray-600">Category: </span>
              <Badge variant="default">{product.category}</Badge>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <Select
                label="Color"
                options={product.colors.map((color) => ({
                  value: color,
                  label: color,
                }))}
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                placeholder="Select a color"
              />
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <Select
                label="Size"
                options={product.sizes.map((size) => ({
                  value: size,
                  label: size,
                }))}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                placeholder="Select a size"
              />
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              fullWidth
              className="flex items-center justify-center gap-2 text-lg py-4"
            >
              <FiShoppingCart />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Stock Status */}
            <div className="mt-4">
              {product.inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="error">Out of Stock</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store';
import { ProductGrid } from '@/components/organisms';
import { PluginRenderer } from '@/components/plugins';
import { Button } from '@/components/atoms';
import { usePlugins } from '@/hooks/usePlugins';

export default function HomePage() {
  // Initialize plugins
  usePlugins();

  const { allProducts } = useAppSelector((state) => state.products);
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Plugin Area - Top */}
      <PluginRenderer position="top" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to YCompany
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover Premium Luxury Fashion
          </p>
          <Link href="/products">
            <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked selections from our latest collection
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Sweaters', 'Blazers', 'Shoes', 'Accessories'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose YCompany
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest materials and craftsmanship
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                On orders over $100 worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plugin Area - Bottom */}
      <PluginRenderer position="bottom" />
    </div>
  );
}
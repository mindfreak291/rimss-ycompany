'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { setSearchQuery } from '@/lib/store/productsSlice';
import { ProductGrid, FilterSidebar } from '@/components/organisms';
import { SearchBar } from '@/components/molecules';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { filteredProducts, isLoading } = useAppSelector(
    (state) => state.products
  );

  // Handle URL search params (for category links)
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      // This will be handled by FilterSidebar component
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Products
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Main Content - Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
            </div>
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React from 'react';
import { Select, Button } from '@/components/atoms';
import { categories, colors, priceRanges } from '@/mocks/products';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setFilter, clearFilters } from '@/lib/store/productsSlice';

export const FilterSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.products);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ category: e.target.value }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ color: e.target.value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = priceRanges.find((r) => r.label === e.target.value);
    if (selectedRange) {
      dispatch(
        setFilter({ minPrice: selectedRange.min, maxPrice: selectedRange.max })
      );
    }
  };

  const handleDiscountToggle = () => {
    dispatch(setFilter({ discountOnly: !filter.discountOnly }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters =
    filter.category ||
    filter.color ||
    filter.minPrice !== undefined ||
    filter.discountOnly;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <Select
        label="Category"
        options={categories.map((cat) => ({ value: cat, label: cat }))}
        value={filter.category || ''}
        onChange={handleCategoryChange}
        placeholder="All Categories"
      />

      {/* Color Filter */}
      <Select
        label="Color"
        options={colors.map((color) => ({ value: color, label: color }))}
        value={filter.color || ''}
        onChange={handleColorChange}
        placeholder="All Colors"
      />

      {/* Price Range Filter */}
      <Select
        label="Price Range"
        options={priceRanges.map((range) => ({
          value: range.label,
          label: range.label,
        }))}
        value={
          priceRanges.find(
            (r) => r.min === filter.minPrice && r.max === filter.maxPrice
          )?.label || ''
        }
        onChange={handlePriceChange}
        placeholder="All Prices"
      />

      {/* Discount Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="discountOnly"
          checked={filter.discountOnly || false}
          onChange={handleDiscountToggle}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label
          htmlFor="discountOnly"
          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          Show Discounted Only
        </label>
      </div>
    </div>
  );
};
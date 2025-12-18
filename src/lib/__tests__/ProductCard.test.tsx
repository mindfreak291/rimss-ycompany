import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../../components/molecules';
import { Product } from '@/types';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  discountPrice: 80,
  category: 'Test Category',
  colors: ['Red', 'Blue'],
  sizes: ['M', 'L'],
  images: ['test-image.jpg'],
  inStock: true,
  featured: true,
  rating: 4.5,
  reviews: 10,
};

describe('ProductCard Component', () => {
  test('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('renders product description', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('displays discount price when available', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$80.00')).toBeInTheDocument();
  });

  test('displays original price with strikethrough when discounted', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toHaveClass('line-through');
  });

  test('displays discount badge', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  test('displays rating', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  test('displays review count', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
  });

  test('shows out of stock badge when not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  test('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/1');
  });
});
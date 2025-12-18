'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/atoms';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-md text-center">
          <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase!
          </p>

          {orderId && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderId}</p>
            </div>
          )}

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-600">
                  You will receive an order confirmation email with details of your order.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Processing</p>
                <p className="text-sm text-gray-600">
                  Your order is being prepared for shipment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 text-xl">○</span>
              <div>
                <p className="font-semibold text-gray-900">Shipping</p>
                <p className="text-sm text-gray-600">
                  You will receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push('/products')}
              variant="outline"
              fullWidth
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => router.push('/')}
              fullWidth
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
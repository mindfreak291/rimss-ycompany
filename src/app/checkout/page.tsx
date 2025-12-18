'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { clearCart } from '@/lib/store/cartSlice';
import { showNotification } from '@/lib/store/uiSlice';
import { Input, Button, Select, LoadingSpinner } from '@/components/atoms';
import { ShippingAddress, PaymentInfo } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const [step, setStep] = useState<'shipping' | 'payment' | 'processing'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'cod'>('credit_card');

  // Redirect if cart is empty
  if (items.length === 0 && step !== 'processing') {
    router.push('/cart');
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping address
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
      dispatch(
        showNotification({
          message: 'Please fill in all required fields',
          type: 'error',
        })
      );
      return;
    }

    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'credit_card') {
      // Validate payment info
      if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv) {
        dispatch(
          showNotification({
            message: 'Please fill in all payment details',
            type: 'error',
          })
        );
        return;
      }
    }

    // Simulate payment processing
    setStep('processing');

    // Mock payment processing delay
    setTimeout(() => {
      // Generate order ID
      const orderId = `ORD-${Date.now()}`;

      // Clear cart
      dispatch(clearCart());

      // Show success notification
      dispatch(
        showNotification({
          message: 'Order placed successfully!',
          type: 'success',
        })
      );

      // Redirect to confirmation page
      router.push(`/checkout/confirmation?orderId=${orderId}`);
    }, 2500);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  if (step === 'processing') {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center bg-white p-12 rounded-lg shadow-md">
            <LoadingSpinner size="lg" className="mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Processing Your Order
            </h2>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step === 'shipping' ? 'text-primary-600' : 'text-green-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'shipping' ? 'bg-primary-600 text-white' : 'bg-green-600 text-white'}`}>
                {step === 'payment' ? '✓' : '1'}
              </div>
              <span className="ml-2 font-semibold">Shipping</span>
            </div>
            <div className={`w-24 h-1 mx-4 ${step === 'payment' ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step === 'payment' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'payment' ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Address
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    required
                    placeholder="123 Main St, Apt 4B"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      required
                      placeholder="New York"
                    />
                    <Input
                      label="State"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      required
                      placeholder="NY"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="ZIP Code"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleShippingChange}
                      required
                      placeholder="10001"
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                      required
                      placeholder="USA"
                    />
                  </div>
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={handleShippingChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                  <Button type="submit" fullWidth>
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-3"
                      />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-3"
                      />
                      <span className="font-medium">PayPal</span>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-3"
                      />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  {paymentMethod === 'credit_card' && (
                    <>
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        type="text"
                      />
                      <Input
                        label="Cardholder Name"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        required
                        placeholder="John Doe"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          required
                          placeholder="MM/YY"
                        />
                        <Input
                          label="CVV"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          required
                          placeholder="123"
                          type="text"
                        />
                      </div>
                    </>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-6 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-700 mb-4">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        Pay with cash when your order is delivered.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep('shipping')}
                      fullWidth
                    >
                      Back
                    </Button>
                    <Button type="submit" fullWidth>
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="max-h-48 overflow-y-auto space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.product.name}
                        </p>
                        <p className="text-gray-600">
                          {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Secure SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
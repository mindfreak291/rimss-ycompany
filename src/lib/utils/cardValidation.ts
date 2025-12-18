/**
 * Credit Card Validation Utilities
 */

// Luhn Algorithm for card number validation
export const validateCardNumber = (cardNumber: string): boolean => {
    // Remove spaces and dashes
    const cleaned = cardNumber.replace(/[\s-]/g, '');
    
    // Check if it's only digits
    if (!/^\d+$/.test(cleaned)) {
      return false;
    }
  
    // Must be between 13-19 digits
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }
  
    // Luhn Algorithm
    let sum = 0;
    let isEven = false;
  
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
  
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      isEven = !isEven;
    }
  
    return sum % 10 === 0;
  };
  
  // Format card number with spaces (4 digits groups)
  export const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };
  
  // Detect card type
  export const detectCardType = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/[\s-]/g, '');
  
    // Visa
    if (/^4/.test(cleaned)) {
      return 'Visa';
    }
    // Mastercard
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
      return 'Mastercard';
    }
    // American Express
    if (/^3[47]/.test(cleaned)) {
      return 'American Express';
    }
    // Discover
    if (/^6(?:011|5)/.test(cleaned)) {
      return 'Discover';
    }
  
    return 'Unknown';
  };
  
  // Validate expiry date
  export const validateExpiryDate = (expiry: string): boolean => {
    // Format: MM/YY
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    
    if (!regex.test(expiry)) {
      return false;
    }
  
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // 0-indexed
  
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
  
    // Check if expired
    if (expiryYear < currentYear) {
      return false;
    }
  
    if (expiryYear === currentYear && expiryMonth < currentMonth) {
      return false;
    }
  
    return true;
  };
  
  // Format expiry date
  export const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };
  
  // Validate CVV
  export const validateCVV = (cvv: string, cardType: string = 'Unknown'): boolean => {
    // American Express uses 4 digits, others use 3
    const length = cardType === 'American Express' ? 4 : 3;
    
    const regex = new RegExp(`^\\d{${length}}$`);
    return regex.test(cvv);
  };
  
  // Format CVV (only numbers)
  export const formatCVV = (value: string, maxLength: number = 3): string => {
    return value.replace(/\D/g, '').slice(0, maxLength);
  };
  
  // Validate cardholder name
  export const validateCardholderName = (name: string): boolean => {
    // Must contain at least first and last name
    const trimmed = name.trim();
    return trimmed.length >= 3 && /^[a-zA-Z\s]+$/.test(trimmed) && trimmed.includes(' ');
  };
  
  // Get validation message
  export const getCardNumberError = (cardNumber: string): string | null => {
    if (!cardNumber) {
      return 'Card number is required';
    }
  
    const cleaned = cardNumber.replace(/[\s-]/g, '');
  
    if (cleaned.length < 13) {
      return 'Card number is too short';
    }
  
    if (cleaned.length > 19) {
      return 'Card number is too long';
    }
  
    if (!/^\d+$/.test(cleaned)) {
      return 'Card number must contain only digits';
    }
  
    if (!validateCardNumber(cardNumber)) {
      return 'Invalid card number';
    }
  
    return null;
  };
  
  export const getExpiryDateError = (expiry: string): string | null => {
    if (!expiry) {
      return 'Expiry date is required';
    }
  
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return 'Format must be MM/YY';
    }
  
    if (!validateExpiryDate(expiry)) {
      return 'Card has expired or invalid date';
    }
  
    return null;
  };
  
  export const getCVVError = (cvv: string, cardType: string = 'Unknown'): string | null => {
    if (!cvv) {
      return 'CVV is required';
    }
  
    const expectedLength = cardType === 'American Express' ? 4 : 3;
  
    if (cvv.length < expectedLength) {
      return `CVV must be ${expectedLength} digits`;
    }
  
    if (!/^\d+$/.test(cvv)) {
      return 'CVV must contain only digits';
    }
  
    return null;
  };
  
  export const getCardholderNameError = (name: string): string | null => {
    if (!name) {
      return 'Cardholder name is required';
    }
  
    const trimmed = name.trim();
  
    if (trimmed.length < 3) {
      return 'Name is too short';
    }
  
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      return 'Name must contain only letters';
    }
  
    if (!trimmed.includes(' ')) {
      return 'Please enter full name (first and last)';
    }
  
    return null;
  };
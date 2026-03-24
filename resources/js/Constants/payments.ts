/**
 * Payment Methods Configuration
 * Centralized list of payment method logos displayed in footer
 */

export interface PaymentMethod {
  name: string;
  logo: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { name: 'Midtrans', logo: 'midtrans.webp' },
  { name: 'BCA', logo: 'bca.webp' },
  { name: 'Mandiri', logo: 'mandiri.webp' },
  { name: 'BNI', logo: 'bni.webp' },
  { name: 'BRI', logo: 'bri.webp' },
  { name: 'Permata Bank', logo: 'permatabank.webp' },
  { name: 'OVO', logo: 'ovo.webp' },
  { name: 'DANA', logo: 'dana.webp' },
  { name: 'GoPay', logo: 'gopay.webp' },
  { name: 'LinkAja', logo: 'linkaja.webp' },
  { name: 'Visa', logo: 'visa.webp' },
  { name: 'PayPal', logo: 'paypal.webp' },
  { name: 'JCB', logo: 'jcb.webp' },
  { name: 'Alfamart', logo: 'alfamart.webp' },
  { name: 'QRIS', logo: 'qris.webp' },
  { name: 'ShopeePay', logo: 'shopee.webp' },
];

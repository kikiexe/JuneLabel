import { useState, FormEvent, MouseEvent } from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import WhatsAppButton from '@/Utils/WhatsAppButton';
import Alert from '@/Utils/Alert';
import { PAYMENT_METHODS } from '@/Constants/payments';
import { CONTACT_INFO } from '@/Constants/contact';
import { validateEmail } from '@/Utils/validation';

interface PaymentMethod {
  name: string;
  logo: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDevFeature = (e: MouseEvent) => {
    e.preventDefault();
    setAlertOpen(true);
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsSubmitting(true);

    try {
      const token =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';

      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setToastMessage(data.message);
        setShowToast(true);
        setEmail('');

        // Auto hide toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        setEmailError(data.message);
      }
    } catch (error) {
      setEmailError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Newsletter subscribe error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white text-june-gray py-12 px-6 md:px-10 lg:px-16 font-inter text-sm relative">
      <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />
      <WhatsAppButton />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-6 z-[100] bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl animate-slide-up flex items-center gap-3 max-w-md">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm">{toastMessage}</p>
          <button
            onClick={() => setShowToast(false)}
            className="ml-auto hover:opacity-80 transition-opacity"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#020002] uppercase">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-2 text-xs text-[#020002]/80">
              <li>
                <Link href="/payment-information" className="hover:underline">
                  Payment Information
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="hover:underline">
                  How to Order
                </Link>
              </li>
              <li>
                <Link href="/how-to-pay" className="hover:underline">
                  How to Pay
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:underline">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#020002] uppercase">
              JUNE LABEL
            </h3>
            <p className="text-xs leading-relaxed mb-6 text-[#020002]/80">
              Founded in 2025, June Label comes with variety of cute and sweet colors as
              characteristic of Muslimah who always spread kindness. We inspire to present
              comfortable daily hijab for your everyday wear.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                onClick={handleDevFeature}
                className="hover:opacity-70 transition-opacity text-[#020002]"
                aria-label="Follow us on Facebook"
                title="Follow us on Facebook"
              >
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@junelabel.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity text-[#020002]"
                aria-label="Follow us on TikTok"
                title="Follow us on TikTok"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/junelabel.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity text-[#020002]"
                aria-label="Follow us on Instagram"
                title="Follow us on Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:junelabelco@gmail.com"
                className="hover:opacity-70 transition-opacity text-[#020002]"
                aria-label="Email us"
                title="Email us at junelabelco@gmail.com"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#020002] uppercase">
              CUSTOMER SERVICES
            </h3>
            <div className="space-y-3 text-xs text-[#020002]/80">
              <p>
                Chat with Us :{' '}
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-all"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>{CONTACT_INFO.workingHours}</p>
              <p className="mt-4">
                Email :{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline transition-all">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#020002] uppercase">
              ABOUT US
            </h3>
            <ul className="space-y-2 text-xs text-[#020002]/80">
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/our-store" className="hover:underline">
                  Our Store
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:underline">
                  Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#020002] uppercase">
              NEWSLETTER
            </h3>
            <p className="text-xs leading-relaxed mb-4 text-[#020002]/80">
              Subscribe to our newsletter for exclusive offers and updates!
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder=" Enter your email address"
                required
                className="w-full px-0 py-2 text-xs border-b border-[#020002] bg-transparent focus:outline-none focus:border-[#020002] transition-colors placeholder-[#020002]/50"
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 group relative px-6 py-2 text-xs font-bold uppercase tracking-[0.15em] border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 w-full h-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-[#7C634D]">
                  {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE →'}
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 text-center">
          <div className="grid grid-cols-8 md:flex md:flex-wrap justify-center items-center gap-x-1 gap-y-3 md:gap-x-4 mb-4 opacity-70">
            {PAYMENT_METHODS.map((payment: any, index: number) => (
              <div key={index} className="flex justify-center items-center px-1">
                <img
                  src={`/images/payments/${payment.logo}`}
                  alt={payment.name}
                  title={payment.name}
                  className="h-3 md:h-4 w-auto object-contain grayscale hover:grayscale-0 transition-all max-w-full"
                />
              </div>
            ))}
          </div>
          <p className="text-[10px] md:text-xs pt-2 text-[#020002]/60">
            &copy; {currentYear} <span className="underline">June Label</span> - All Rights
            Reserved. Developed by{' '}
            <a
              href="https://www.instagram.com/munkstudio.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              munkstudio.id
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

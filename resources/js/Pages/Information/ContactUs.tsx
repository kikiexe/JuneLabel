import React, { useState, ChangeEvent, FormEvent } from 'react';
import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/Constants/contact';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':
            document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ form: data.message });
        }
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setErrors({
        form: 'Terjadi kesalahan sistem. Silakan coba lagi nanti atau hubungi kami via WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Us"
        description="Hubungi JuneLabel. Kami siap membantu Anda. WhatsApp, Email, atau kirim pesan langsung."
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
      <Navbar />
      <main style={{ backgroundColor: '#ffffff' }} className="font-inter">
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              Contact Us
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              We'd love to hear from you
            </p>
          </div>

          {showSuccess && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Terima kasih! Pesan Anda sudah kami terima. Kami akan segera menghubungi Anda.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <Mail className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">Email</h3>
                    <p className="text-[#7C634D]/80">{CONTACT_INFO.email}</p>
                    <p className="text-[#7C634D]/80 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <Phone className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C634D]/80 hover:underline"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-[#7C634D]/80 text-sm mt-1">{CONTACT_INFO.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FFF6EC] rounded-lg">
                    <MapPin className="w-6 h-6 text-[#7C634D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#7C634D] mb-1">Office</h3>
                    <p className="text-[#7C634D]/80">Currently Online Store Only</p>
                    <p className="text-[#7C634D]/80">Shipping from Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF6EC] p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#7C634D' }}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200 mb-4">
                    {errors.form}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D] ${errors.name ? 'border-red-500' : 'border-[#7C634D]/20'}`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D] ${errors.email ? 'border-red-500' : 'border-[#7C634D]/20'}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D] ${errors.subject ? 'border-red-500' : 'border-[#7C634D]/20'}`}
                    required
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7C634D] mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D] ${errors.message ? 'border-red-500' : 'border-[#7C634D]/20'}`}
                    required
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#7C634D] text-white font-semibold rounded hover:bg-[#6a5441] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

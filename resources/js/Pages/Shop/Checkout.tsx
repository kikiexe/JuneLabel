import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { useCart } from '@/Contexts/CartContext';
import { PackageSearch, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sanitizeString } from '@/Utils/validation';
import axios from 'axios';
import { ShippingLocation, ShippingOption } from '@/types';

interface CheckoutFormData {
  customer_name: string;
  email: string;
  customer_phone: string;
  shipping_address: string;
  notes: string;
  items: Array<{ id: number; quantity: number }>;
  shipping_courier: string;
  shipping_service: string;
  shipping_cost: number;
  shipping_etd: string;
  destination_district_id: string | number;
}

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [displayTotal, setDisplayTotal] = useState(0);

  // Shipping states
  const [provinces, setProvinces] = useState<ShippingLocation[]>([]);
  const [cities, setCities] = useState<ShippingLocation[]>([]);
  const [districts, setDistricts] = useState<ShippingLocation[]>([]);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | number>('');
  const [selectedCity, setSelectedCity] = useState<string | number>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>('');

  const { data, setData, post, processing, errors } = useForm<CheckoutFormData>({
    customer_name: '',
    email: '',
    customer_phone: '',
    shipping_address: '',
    notes: '',
    items: [],
    shipping_courier: '',
    shipping_service: '',
    shipping_cost: 0,
    shipping_etd: '',
    destination_district_id: '',
  });

  useEffect(() => {
    const itemsPayload = cartItems.map((item) => ({
      id: item.product_id,
      quantity: item.quantity,
    }));

    setData('items', itemsPayload);
    setDisplayTotal(getCartTotal());

    // Load provinces on mount
    loadProvinces();
  }, [cartItems]);

  const loadProvinces = async () => {
    try {
      const response = await axios.get('/api/shipping/provinces');
      if (response.data?.data) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load provinces:', error);
    }
  };

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedCity('');
    setSelectedDistrict('');
    setCities([]);
    setDistricts([]);
    setShippingOptions([]);

    if (provinceId) {
      try {
        const response = await axios.get(`/api/shipping/cities/${provinceId}`);
        if (response.data?.data) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load cities:', error);
      }
    }
  };

  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');
    setDistricts([]);
    setShippingOptions([]);

    if (cityId) {
      try {
        const response = await axios.get(`/api/shipping/districts/${cityId}`);
        if (response.data?.data) {
          setDistricts(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load districts:', error);
      }
    }
  };

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setShippingOptions([]);

    // We update multiple fields at once
    setData((prev) => ({
      ...prev,
      shipping_courier: '',
      shipping_service: '',
      shipping_cost: 0,
      shipping_etd: '',
      destination_district_id: districtId,
    }));

    if (districtId) {
      // Calculate shipping costs
      await calculateShippingCosts(districtId);
    }
  };

  const calculateShippingCosts = async (districtId: string | number) => {
    setLoadingShipping(true);
    try {
      // Calculate total weight using actual product weights
      // If product doesn't have weight attribute, default to 200 grams (pashmina average)
      const totalWeight = cartItems.reduce((sum, item) => {
        const productWeight = item.weight || (item as any).product?.weight || 200; // grams
        return sum + item.quantity * productWeight;
      }, 0);

      const response = await axios.post('/api/shipping/calculate-cost', {
        destination_district_id: districtId,
        weight: totalWeight,
      });

      if (response.data?.success && response.data?.data) {
        setShippingOptions(response.data.data);
      }
    } catch (error) {
      console.error('Failed to calculate shipping costs:', error);
      alert('Gagal menghitung ongkos kirim. Silakan coba lagi.');
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setData((prev) => ({
      ...prev,
      shipping_courier: option.courier_code,
      shipping_service: option.service,
      shipping_cost: option.cost,
      shipping_etd: option.etd,
    }));
  };

  // Sanitization handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeString(e.target.value);
    setData('customer_name', sanitized);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeString(e.target.value);
    setData('customer_phone', sanitized);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitized = sanitizeString(e.target.value);
    setData('shipping_address', sanitized);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitized = sanitizeString(e.target.value);
    setData('notes', sanitized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting checkout form with data:', data);

    post(route('checkout.store'), {
      onBefore: () => console.log('Starting checkout request...'),
      onSuccess: () => {
        console.log('Checkout successful!');
        clearCart();
      },
      onError: (errors) => {
        console.error('Checkout failed with errors:', errors);
        alert('Checkout failed. Please check the form for errors.');
      },
      onFinish: () => console.log('Checkout request completed.'),
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cartItems.length === 0 && displayTotal === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-[#7C634D]">
            <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
            <Link href="/" className="underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const finalTotal = displayTotal + data.shipping_cost;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EC] font-inter">
      <Head title="Checkout - June Label" />
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide uppercase text-[#7C634D]">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {(errors as any).error && (
            <div
              className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{(errors as any).error}</span>
            </div>
          )}

          <div className="w-full lg:w-3/5">
            <div className="bg-white p-6 md:p-8 border border-[#7C634D]/10 rounded-sm shadow-sm">
              <h2 className="text-lg font-bold text-[#7C634D] uppercase tracking-wider mb-6 pb-2 border-b border-[#7C634D]/10">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.customer_name}
                    onChange={handleNameChange}
                    className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors"
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors"
                    placeholder="Enter your email"
                    required
                    aria-required="true"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Phone Number / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.customer_phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors"
                    placeholder="0812..."
                    required
                    aria-required="true"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.customer_phone}</p>
                  )}
                </div>

                {/* Shipping Location Selection */}
                <div className="space-y-4 p-4 bg-[#f9f9f9] border border-gray-200 rounded">
                  <div className="flex items-center gap-2 text-[#7C634D] mb-2">
                    <PackageSearch className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Select Destination
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Province</label>
                    <select
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      className="w-full bg-white border border-gray-300 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-3 py-2 text-sm"
                    >
                      <option value="">-- Select Province --</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!selectedProvince}
                      className="w-full bg-white border border-gray-300 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-3 py-2 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">-- Select City --</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      District / Kecamatan
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      disabled={!selectedCity}
                      className="w-full bg-white border border-gray-300 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-3 py-2 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">-- Select District --</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shipping Options */}
                {loadingShipping && (
                  <div className="text-center py-4 text-[#7C634D]">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#7C634D]"></div>
                    <p className="mt-2 text-xs">Calculating shipping costs...</p>
                  </div>
                )}

                {shippingOptions.length > 0 && !loadingShipping && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#7C634D]">
                      <Truck className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Choose Shipping Method
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {shippingOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleShippingSelect(option)}
                          className={`p-3 border-2 rounded cursor-pointer transition-all ${
                            data.shipping_courier === option.courier_code &&
                            data.shipping_service === option.service
                              ? 'border-[#7C634D] bg-[#7C634D]/5'
                              : 'border-gray-200 hover:border-[#7C634D]/50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <p className="font-bold text-sm text-[#7C634D]">
                                {option.courier_code} - {option.service}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Estimasi: {option.etd} hari
                              </p>
                              {option.description && (
                                <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-bold text-sm text-[#7C634D]">
                                {formatPrice(option.cost)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Method Section */}
                <div className="pt-6 border-t border-[#7C634D]/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Payment Method
                  </label>
                  
                  <div className="space-y-3">
                    {/* Manual Transfer (Active/Default) */}
                    <div className="p-4 border-2 border-[#7C634D] bg-[#7C634D]/5 rounded cursor-pointer transition-all">
                      <div className="flex justify-between items-center">
                        <div className="flex-grow">
                          <p className="font-bold text-sm text-[#7C634D]">
                            Manual Bank Transfer
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Transfer ke Rekening BCA, verifikasi melalui WhatsApp.
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="w-4 h-4 rounded-full border-4 border-[#7C634D] bg-white"></div>
                        </div>
                      </div>
                    </div>

                    {/* Auto Payment / Midtrans (Disabled) */}
                    <div className="p-4 border border-gray-200 bg-gray-50 rounded cursor-not-allowed opacity-60">
                      <div className="flex justify-between items-center">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-sm text-gray-500">
                              Instant Payment Method
                            </p>
                            <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              In Progress
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Virtual Account, QRIS, e-Wallet (Otomatis via Midtrans).
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Shipping Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={data.shipping_address}
                    onChange={handleAddressChange}
                    className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors resize-none"
                    placeholder="Full address (Street, RT/RW, Village, Postal Code)"
                    required
                    aria-required="true"
                  ></textarea>
                  {errors.shipping_address && (
                    <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={data.notes}
                    onChange={handleNotesChange}
                    className="w-full bg-[#f9f9f9] border border-gray-200 focus:border-[#7C634D] focus:ring-0 text-[#7C634D] px-4 py-3 text-sm transition-colors resize-none"
                    placeholder="Special instructions for delivery"
                  ></textarea>
                </div>

                <div className="lg:hidden mt-8">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#7C634D] text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors disabled:opacity-70"
                  >
                    {processing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="bg-white p-6 md:p-8 border border-[#7C634D]/10 rounded-sm shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-[#7C634D] uppercase tracking-wider mb-6 pb-2 border-b border-[#7C634D]/10">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {cartItems.map((item) => {
                  const itemPrice =
                    typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                  const itemImage = (item as any).product?.image || (item as any).image;
                  const itemName = (item as any).product?.name || (item as any).name;

                  return (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-16 h-20 bg-[#f9f9f9] flex-shrink-0 border border-gray-100">
                        <img
                          src={`/storage/${itemImage}`}
                          alt={itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-serif text-[#7C634D] text-sm leading-tight mb-1">
                          {itemName}
                        </h4>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-medium text-[#7C634D]">
                            {formatPrice(itemPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#7C634D]/10 text-sm text-[#7C634D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(displayTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span
                    className={
                      data.shipping_cost > 0 ? 'font-medium text-[#7C634D]' : 'italic text-xs'
                    }
                  >
                    {data.shipping_cost > 0 ? (
                      <>
                        {formatPrice(data.shipping_cost)}
                        <span className="block text-xs text-gray-400 text-right mt-1">
                          {data.shipping_courier} - {data.shipping_service}
                        </span>
                      </>
                    ) : (
                      'Select destination first'
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-[#7C634D]/10">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="hidden lg:block mt-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Trigger the form submission
                    const form = document.querySelector('form');
                    if (form) {
                      form.requestSubmit();
                    }
                  }}
                  disabled={processing}
                  className="w-full bg-[#7C634D] text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#65503D] transition-colors disabled:opacity-70 group relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {processing ? 'Processing...' : 'Place Order'}
                  </span>
                </button>
              </div>

              <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">
                By placing this order, you agree to our Terms and Conditions. <br />
                <strong>Secure Checkout:</strong> Prices are validated by our server.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

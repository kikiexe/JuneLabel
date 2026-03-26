import React, { useState, FormEvent } from 'react';
import SeoHead from '@/Components/SeoHead';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import axios from 'axios';

interface Courier {
  code: string;
  name: string;
}

interface TrackOrderProps {
  couriers: Courier[];
}

interface TrackingResult {
  summary: {
    status: string;
    service: string;
    courier: string;
  };
  detail: {
    origin: string;
    destination: string;
    shipper: string;
    receiver: string;
  };
  history: Array<{
    date: string;
    desc: string;
    location: string;
  }>;
}

export default function TrackOrder({ couriers }: TrackOrderProps) {
  const [courier, setCourier] = useState('jne');
  const [awb, setAwb] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    if (!awb) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/api/track-order', {
        courier,
        awb,
      });

      if (response.data.status === 200) {
        setResult(response.data.data);
      } else {
        setError(response.data.message || 'Resi tidak ditemukan atau terjadi kesalahan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Track Order"
        description="Lacak status pengiriman paket pesanan JuneLabel Anda dengan mudah."
        canonicalPath="/track-order"
      />
      <Navbar />
      <main
        style={{ backgroundColor: '#ffffff' }}
        className="font-inter min-h-[calc(100vh-80px)] pt-16 xl:pt-20"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-monstserrat font-semibold mb-4"
              style={{ color: '#7C634D' }}
            >
              Track Order
            </h1>
            <p className="text-xl font-monstserrat" style={{ color: '#7C634D', opacity: 0.8 }}>
              Lacak posisi paket Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#FFF6EC] p-8 rounded-lg shadow-sm sticky top-24">
                <form onSubmit={handleTrack} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#7C634D] mb-1">
                      Ekspedisi
                    </label>
                    <select
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                      className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]"
                    >
                      {couriers.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7C634D] mb-1">
                      Nomor Resi
                    </label>
                    <input
                      type="text"
                      value={awb}
                      onChange={(e) => setAwb(e.target.value)}
                      className="w-full px-4 py-2 border border-[#7C634D]/20 rounded focus:outline-none focus:border-[#7C634D] bg-white text-[#7C634D]"
                      placeholder="Contoh: 882392812"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#7C634D] text-white font-semibold rounded hover:bg-[#6a5441] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Mengecek...' : 'Cek Resi'}
                  </button>
                </form>
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-2">
              {!result && !loading && (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg">
                  Isi formulir di samping untuk melacak pesanan.
                </div>
              )}

              {loading && (
                <div className="text-center py-12 text-[#7C634D] animate-pulse">
                  Sedang mengambil data tracking...
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="bg-white border text-[#7C634D] p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Detail Pengiriman</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <div>
                        <p className="opacity-60">Status</p>
                        <p className="font-bold text-green-600 uppercase">
                          {result.summary.status}
                        </p>
                      </div>
                      <div>
                        <p className="opacity-60">Layanan</p>
                        <p className="font-bold">{result.summary.service}</p>
                      </div>
                      <div className="overflow-hidden">
                        <p className="opacity-60">Pengirim</p>
                        <p className="font-bold break-all">{result.detail.shipper || '-'}</p>
                        <p className="text-xs opacity-70 break-all">{result.detail.origin}</p>
                      </div>
                      <div className="overflow-hidden">
                        <p className="opacity-60">Penerima</p>
                        <p className="font-bold break-all">{result.detail.receiver || '-'}</p>
                        <p className="text-xs opacity-70 break-all">{result.detail.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white border p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-6 text-[#7C634D]">Riwayat Perjalanan</h3>
                    <div className="relative border-l-2 border-[#7C634D]/20 ml-3 space-y-8 pl-8 pb-2">
                      {result.history.map((hist, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#7C634D] border-4 border-white shadow-sm z-10"></div>
                          <p className="text-xs text-gray-500 mb-1">
                            {new Date(hist.date).toLocaleString('id-ID', {
                              dateStyle: 'long',
                              timeStyle: 'short',
                            })}
                          </p>
                          <p className="text-sm font-medium text-[#7C634D]">{hist.desc}</p>
                          <p className="text-xs text-gray-500 mt-1">{hist.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

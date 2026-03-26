import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { Head, Link } from '@inertiajs/react';
import { formatCurrency } from '@/lib/utils';
import { PageProps, Order } from '@/types';

interface MyOrdersProps extends PageProps {
  orders?: Order[];
}

export default function MyOrders({ auth, orders = [] }: MyOrdersProps) {
  const getStatusBadgeClass = (status: string | any) => {
    const statusValue = typeof status === 'object' ? status.value : status;

    const classes: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      processing: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return classes[statusValue] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string | any) => {
    const statusValue = typeof status === 'object' ? status.value : status;

    const labels: Record<string, string> = {
      pending: 'Menunggu',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Selesai',
      cancelled: 'Dibatalkan',
    };

    return labels[statusValue] || statusValue;
  };

  const getPaymentStatusBadgeClass = (status: string | any) => {
    const statusValue = typeof status === 'object' ? status.value : status;

    const classes: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800',
    };

    return classes[statusValue] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusLabel = (status: string | any) => {
    const statusValue = typeof status === 'object' ? status.value : status;

    const labels: Record<string, string> = {
      pending: 'Belum Bayar',
      success: 'Berhasil',
      failed: 'Gagal',
      expired: 'Kadaluarsa',
    };

    return labels[statusValue] || statusValue;
  };

  const handlePayment = (snapToken: string, orderId: string) => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: function (result: any) {
          window.location.href = `/order/${orderId}`;
        },
        onPending: function (result: any) {
          window.location.reload();
        },
        onError: function (result: any) {
          alert('Payment failed. Please try again.');
        },
        onClose: function () {
          console.log('Payment popup closed');
        },
      });
    } else {
      alert('Payment system is loading. Please try again in a moment.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Head title="My Orders" />
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-1 border-gray-200">
              <Link
                href={route('dashboard')}
                className="py-3 px-4 text-sm font-medium uppercase tracking-widest text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors font-inter text-left border-b border-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href={route('my.orders')}
                className="py-3 px-4 text-sm font-bold uppercase tracking-widest text-white bg-[#7C634D] font-inter text-left"
              >
                My Orders
              </Link>

              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="py-3 px-4 text-sm font-medium uppercase tracking-widest text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors font-inter text-left border-b border-gray-100 w-full"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white">
              <h1 className="text-2xl font-bold text-[#7C634D] mb-6 font-inter">My Orders</h1>

              {orders.length === 0 ? (
                <div className="bg-gray-50 p-12 border border-gray-100 text-center">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Link
                    href={route('collections.index')}
                    className="inline-block bg-[#7C634D] text-white px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#6B5440] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const paymentStatus =
                      typeof order.payment_status === 'object'
                        ? (order.payment_status as any).value
                        : order.payment_status;
                    const isPending = paymentStatus === 'pending';

                    return (
                      <div
                        key={order.id}
                        className="border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Order ID: </span>
                                <span className="font-semibold text-[#7C634D]">
                                  {order.order_id}
                                </span>
                              </div>
                              <div className="text-gray-600">
                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeClass(order.payment_status)}`}
                              >
                                {getPaymentStatusLabel(order.payment_status)}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.order_status)}`}
                              >
                                {getStatusLabel(order.order_status)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-4">
                          <div className="space-y-3 mb-4">
                            {order.order_items &&
                              order.order_items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                                    {item.product?.image_url ? (
                                      <img
                                        src={item.product.image_url}
                                        alt={item.product_name}
                                        className="w-full h-full object-cover"
                                        onError={(e: any) => {
                                          e.target.style.display = 'none';
                                          const parent = e.target.parentElement;
                                          if (parent) {
                                            parent.innerHTML =
                                              '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>';
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-grow">
                                    <p className="font-medium text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-[#7C634D]">
                                      {formatCurrency(item.unit_price * item.quantity)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="text-sm text-gray-600">
                                <p>
                                  <span className="font-medium">Shipping:</span>{' '}
                                  {order.shipping_courier?.toUpperCase()} - {order.shipping_service}
                                </p>
                                {order.tracking_number && (
                                  <p>
                                    <span className="font-medium">Tracking:</span>{' '}
                                    {order.tracking_number}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-xl font-bold text-[#7C634D]">
                                  {formatCurrency(order.gross_amount)}
                                </p>
                              </div>
                            </div>

                            {/* Payment Action Buttons */}
                            {isPending && order.snap_token && (
                              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                <Link
                                  href={`/order/${order.order_id}/cancel`}
                                  method="post"
                                  as="button"
                                  onBefore={() =>
                                    confirm(
                                      'Are you sure you want to cancel this order? Stock will be restored.'
                                    )
                                  }
                                  className="border-2 border-red-500 text-red-500 px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-red-500 hover:text-white transition-colors text-center"
                                >
                                  Batalkan
                                </Link>
                                <button
                                  onClick={() => handlePayment(order.snap_token!, order.order_id)}
                                  className="bg-[#7C634D] text-white px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#6B5440] transition-colors"
                                >
                                  Bayar Sekarang
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

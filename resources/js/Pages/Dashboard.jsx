import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth, stats = { total: 0, pending: 0, completed: 0 } }) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Head title="Dashboard" />
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-1 border-gray-200">
              <Link
                href={route('dashboard')}
                className="py-3 px-4 text-sm font-bold uppercase tracking-widest text-white bg-[#7C634D] font-inter text-left"
              >
                Dashboard
              </Link>
              <Link
                href={route('my.orders')}
                className="py-3 px-4 text-sm font-medium uppercase tracking-widest text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors font-inter text-left border-b border-gray-100"
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
            <div className="bg-gray-50 p-8 border border-gray-100">
              <p className="text-[#7C634D] font-inter text-lg mb-4">
                Hello, <span className="font-bold">{auth.user.name}</span>!
              </p>
              <p className="text-gray-600 font-light mb-8">
                From your account dashboard you can view your recent orders, manage your shipping
                and billing addresses, and edit your password and account details.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-100 text-center hover:shadow-sm transition-shadow">
                  <h3 className="text-[#7C634D] font-medium mb-2 uppercase tracking-wide text-sm">
                    Total Orders
                  </h3>
                  <p className="text-3xl font-light text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 text-center hover:shadow-sm transition-shadow">
                  <h3 className="text-[#7C634D] font-medium mb-2 uppercase tracking-wide text-sm">
                    Pending
                  </h3>
                  <p className="text-3xl font-light text-gray-800">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 text-center hover:shadow-sm transition-shadow">
                  <h3 className="text-[#7C634D] font-medium mb-2 uppercase tracking-wide text-sm">
                    Completed
                  </h3>
                  <p className="text-3xl font-light text-gray-800">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

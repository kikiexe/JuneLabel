import InputError from '@/Components/UI/InputError';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Components/Layout/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent } from 'react';

interface ForgotPasswordProps {
  status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />
      <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-60px)] xl:min-h-[calc(100vh-80px)]">
        {/* Banner Section */}
        <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
          <img
            src="/images/Login/login.webp"
            alt="Forgot Password Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto font-inter">
          <div className="w-full max-w-md animate-fade-in-up px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold font-noto-serif-hk text-[#7C634D] tracking-tight">
                FORGOT PASSWORD
              </h2>
              <p className="mt-3 text-sm text-[#7C634D]/80 leading-relaxed">
                Masukan alamat email Anda untuk menerima tautan pemulihan kata sandi.
              </p>
            </div>

            {status && (
              <div className="mb-6 bg-green-50 p-4 border border-green-200">
                <p className="text-sm font-medium text-green-800 text-center">{status}</p>
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              <div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email Address"
                  className="mt-1 block w-full px-4 py-3 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D]"
                  isFocused={true}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <button
                type="submit"
                className="group relative w-full py-3 font-semibold text-base border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300"
                style={{ borderRadius: '0px' }}
                disabled={processing}
              >
                <span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                <span className="relative z-10 text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#7C634D] flex items-center justify-center">
                  {processing ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#7C634D]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Kirim Tautan...
                    </span>
                  ) : (
                    'KIRIM TAUTAN RESET PASSWORD'
                  )}
                </span>
              </button>

              <div className="text-center text-sm text-[#7C634D] mt-6">
                Ingat kata sandi Anda?{' '}
                <Link
                  href={route('login')}
                  className="text-[#7C634D] font-bold hover:underline focus:outline-none transition-all"
                >
                  Kembali ke Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

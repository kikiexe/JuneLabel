import InputError from '@/Components/UI/InputError';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Components/Layout/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';

interface LoginProps {
  status?: string;
  canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { refreshCart } = useCart();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('login'), {
      replace: true,
      onSuccess: () => {
        refreshCart();
      },
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-60px)] xl:min-h-[calc(100vh-80px)]">
        <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
          <img
            src="/images/Login/login.webp"
            alt="Login Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-md animate-fade-in-up px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold font-noto-serif-hk text-[#7C634D] tracking-tight">
                LOGIN
              </h2>
              <p className="mt-3 text-sm text-[#7C634D] font-inter">
                Please enter your e-mail and password
              </p>
            </div>

            {status && (
              <div className="mb-6 bg-green-50 p-4 border border-green-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{status}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email"
                  className="mt-1 block w-full px-4 py-3 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D]"
                  autoComplete="username"
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <div className="relative">
                  <TextInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    placeholder="Password"
                    className="mt-1 block w-full px-4 py-3 pr-12 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D]"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7C634D] transition-colors focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={20} strokeWidth={2} />
                    ) : (
                      <Eye size={20} strokeWidth={2} />
                    )}
                  </button>
                </div>
                <InputError message={errors.password} className="mt-2" />

                <div className="flex justify-end mt-2">
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="text-sm text-[#7C634D] font-medium hover:underline focus:outline-none focus:underline transition-all"
                    >
                      Lupa password?
                    </Link>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full py-3 font-inter text-base border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300"
                style={{ borderRadius: '0px' }}
                disabled={processing}
              >
                <span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                <span className="relative z-10 text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#7C634D] flex items-center justify-center h-full w-full">
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
                      Processing...
                    </span>
                  ) : (
                    'Log in'
                  )}
                </span>
              </button>

              <div className="text-center text-sm text-[#7C634D] mt-6">
                Belum Punya Akun?{' '}
                <Link
                  href={route('register')}
                  className="text-[#7C634D] font-medium hover:underline focus:outline-none transition-all"
                >
                  Buat Akun
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

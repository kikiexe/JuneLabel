import InputError from '@/Components/UI/InputError';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Components/Layout/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />
      <div className="flex flex-1 overflow-hidden">
        {/* Banner Section */}
        <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
          <img
            src="/images/Login/login.webp"
            alt="Reset Password Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto font-inter">
          <div className="w-full max-w-md animate-fade-in-up px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold font-noto-serif-hk text-[#7C634D] tracking-tight">
                RESET PASSWORD
              </h2>
              <p className="mt-3 text-sm text-[#7C634D]/80 leading-relaxed uppercase tracking-widest">
                Silakan masukkan kata sandi baru Anda
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#7C634D] uppercase tracking-wider mb-2">
                  Email
                </label>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email"
                  className="mt-1 block w-full px-4 py-3 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D] bg-white opacity-70 cursor-not-allowed"
                  autoComplete="username"
                  onChange={(e) => setData('email', e.target.value)}
                  readOnly
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7C634D] uppercase tracking-wider mb-2">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <TextInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    placeholder="New Password"
                    className="mt-1 block w-full px-4 py-3 pr-12 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D] bg-white"
                    autoComplete="new-password"
                    isFocused={true}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7C634D] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7C634D] uppercase tracking-wider mb-2">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <TextInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    placeholder="Confirm New Password"
                    className="mt-1 block w-full px-4 py-3 pr-12 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D] bg-white"
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7C634D] transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>

              <button
                type="submit"
                className="group relative w-full py-4 font-bold text-base border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300"
                style={{ borderRadius: '0px' }}
                disabled={processing}
              >
                <span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                <span className="relative z-10 text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#7C634D] uppercase tracking-widest leading-none flex items-center justify-center">
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
                      PROSES...
                    </span>
                  ) : (
                    'RESET PASSWORD →'
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

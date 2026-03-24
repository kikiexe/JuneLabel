import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Components/Layout/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Mail } from 'lucide-react';

interface VerifyEmailProps {
  status?: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
  const { post, processing } = useForm({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Verify Email" />

      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-neutral-50/50">
            <Mail className="w-10 h-10 text-neutral-900 stroke-[1.5]" />
          </div>

          {/* Header */}
          <h2 className="text-3xl font-serif text-neutral-900 mb-4">Check your email</h2>

          <div className="text-neutral-500 mb-8 leading-relaxed space-y-2">
            <p>Thanks for signing up! We've sent a verification link to your email address.</p>
            <p className="text-sm">
              Please click the link in the email to verify your account. If you don't see it, check
              your spam folder.
            </p>
          </div>

          {/* Success Status */}
          {status === 'verification-link-sent' && (
            <div className="mb-8 p-4 bg-green-50 text-green-800 text-sm rounded-xl border border-green-100 flex items-center justify-center animate-fade-in">
              <span className="mr-2">✓</span> A new verification link has been sent to your email.
            </div>
          )}

          {/* Actions */}
          <form onSubmit={submit} className="flex flex-col gap-5">
            <PrimaryButton
              className="w-full justify-center h-12 text-base font-medium tracking-wide"
              disabled={processing}
            >
              {processing ? 'Sending...' : 'Resend Verification Email'}
            </PrimaryButton>

            <div className="text-center">
              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200 font-medium"
              >
                Log Out
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-card p-8 space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-heading text-red-500">
              Access Denied
            </h1>
            <p className="text-cyber-text-muted">
              You do not have permission to access this area. Only authorized administrators can sign in.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/auth/signin" className="block w-full bg-cyber-neon-teal text-cyber-bg px-6 py-3 rounded-lg font-medium hover:bg-cyber-neon-teal/90 transition-colors text-center">
              Try Again
            </Link>
            <Link href="/" className="block w-full text-cyber-text-muted hover:text-cyber-neon-teal transition-colors text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
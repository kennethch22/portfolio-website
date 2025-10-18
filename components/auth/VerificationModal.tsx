'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function VerificationModal({ isOpen, onClose, onSuccess }: VerificationModalProps) {
  const { data: session } = useSession();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const requestCode = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send code');
      }
      
      setCodeSent(true);
    } catch (err) {
      setError('Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: session?.user?.email,
          code 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid code');
      }
      
      onSuccess();
    } catch (err) {
      setError('Invalid or expired code');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="glass-card p-8 max-w-md w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-heading neon-text">
            Admin Verification
          </h2>
          <p className="text-cyber-text-muted">
            {codeSent 
              ? 'Enter the verification code sent to your email'
              : 'Request a verification code to access admin features'
            }
          </p>
        </div>

        {!codeSent ? (
          <button
            onClick={requestCode}
            disabled={isLoading}
            className="w-full bg-cyber-neon-teal text-cyber-bg-primary px-6 py-3 rounded-lg font-medium hover:shadow-neon-strong transition-all disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="w-full bg-cyber-bg-secondary border border-cyber-neon-teal/30 rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-cyber-neon-teal"
              maxLength={6}
            />
            
            <button
              onClick={verifyCode}
              disabled={isLoading || code.length !== 6}
              className="w-full bg-cyber-neon-teal text-cyber-bg-primary px-6 py-3 rounded-lg font-medium hover:shadow-neon-strong transition-all disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
            
            <button
              onClick={requestCode}
              disabled={isLoading}
              className="w-full text-cyber-text-muted hover:text-cyber-neon-teal transition-colors text-sm"
            >
              Resend Code
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          onClick={onClose}
          className="w-full text-cyber-text-muted hover:text-cyber-text-primary transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
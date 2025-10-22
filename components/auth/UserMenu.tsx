'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-cyber-neon-teal/50"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-cyber-neon-teal/20 flex items-center justify-center">
            <User className="w-4 h-4 text-cyber-neon-teal" />
          </div>
        )}
        <span className="text-sm font-medium text-cyber-text hidden md:block">
          {session.user.name}
        </span>
        <svg
          className={`w-4 h-4 text-cyber-text-muted transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 p-4 space-y-4 z-50 rounded-lg border border-white/10 bg-gray-900">
            {/* User Info */}
            <div className="space-y-1 pb-3 border-b border-white/10">
              <p className="font-medium text-cyber-text">
                {session.user.name}
              </p>
              <p className="text-sm text-cyber-text-muted">
                {session.user.email}
              </p>
            </div>

            {/* Admin Dashboard Link (only if user is admin) */}
            {(session.user as any).isAdmin && (
                           <div className="pb-3 border-b border-white/10">
                <Link
                  href="/admin"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-cyber-text hover:text-cyber-neon-teal transition-colors"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  <Settings className="w-4 h-4" /> {/* Changed icon */}
                  <span className="text-sm font-medium">Admin Dashboard</span>
                </Link>

              </div>
            )}

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
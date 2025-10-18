'use client';

import { useSession } from 'next-auth/react';
import { useAdminStore } from '@/lib/store';
import { Shield, X } from 'lucide-react';

export default function AdminModeIndicator() {
  const { data: session } = useSession();
  const { isAdminMode, toggleAdminMode } = useAdminStore();

  // Only show if user is admin and admin mode is on
  if (!session?.user || !(session.user as any).isAdmin || !isAdminMode) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass-card px-4 py-3 flex items-center gap-3 shadow-lg shadow-cyber-neon-teal/20">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyber-neon-teal animate-pulse" />
          <div>
            <p className="text-sm font-medium text-cyber-neon-teal">
              Admin Mode Active
            </p>
            <p className="text-xs text-cyber-text-muted">
              Edit mode enabled
            </p>
          </div>
        </div>
        <button
          onClick={toggleAdminMode}
          className="p-1 hover:bg-white/5 rounded transition-colors"
          title="Disable admin mode"
        >
          <X className="w-4 h-4 text-cyber-text-muted hover:text-cyber-text" />
        </button>
      </div>
    </div>
  );
}
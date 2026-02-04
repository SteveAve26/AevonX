'use client';

import { useState, useEffect } from 'react';
import { User, Shield, Key, Smartphone, AlertTriangle, CheckCircle, Loader2, LogIn } from 'lucide-react';
import { userApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, refreshUser } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.username) {
      setNewUsername(user.username);
    }
  }, [user]);

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) return;

    setIsSaving(true);
    setError('');

    try {
      const response = await userApi.updateProfile({ username: newUsername });
      if (response.success) {
        await refreshUser();
        setEditingUsername(false);
      } else {
        setError(response.error || 'Failed to update username');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-[#848e9c] mb-8">Manage your account settings and security</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-[#848e9c] mb-8">Manage your account settings and security</p>

        <div className="bg-[#1e2329] rounded-xl p-8 text-center">
          <LogIn className="mx-auto text-[#f0b90b] mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Sign in to view your profile</h3>
          <p className="text-[#848e9c] mb-6">Log in to manage your account settings</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors"
          >
            <LogIn size={18} />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
      <p className="text-[#848e9c] mb-8">Manage your account settings and security</p>

      {error && (
        <div className="mb-6 p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Info */}
        <div className="bg-[#1e2329] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User size={20} />
            Profile Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#2b3139]">
              <div>
                <div className="text-sm text-[#848e9c]">Email</div>
                <div className="text-white">{user.email}</div>
              </div>
              <button className="px-4 py-2 text-sm text-[#f0b90b] hover:bg-[#f0b90b]/10 rounded-lg transition-colors">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-[#2b3139]">
              <div>
                <div className="text-sm text-[#848e9c]">Username</div>
                {editingUsername ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="bg-[#2b3139] px-3 py-1 rounded text-white mt-1"
                  />
                ) : (
                  <div className="text-white">{user.username || 'Not set'}</div>
                )}
              </div>
              {editingUsername ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUsername(false);
                      setNewUsername(user.username || '');
                    }}
                    className="px-4 py-2 text-sm text-[#848e9c] hover:bg-[#2b3139] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUsername}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm bg-[#f0b90b] text-black rounded-lg hover:bg-[#d9a60a] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={14} />}
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingUsername(true)}
                  className="px-4 py-2 text-sm text-[#f0b90b] hover:bg-[#f0b90b]/10 rounded-lg transition-colors"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm text-[#848e9c]">Member Since</div>
                <div className="text-white">{new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#1e2329] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Shield size={20} />
            Security
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#2b3139]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2b3139] rounded-lg flex items-center justify-center">
                  <Key className="text-[#848e9c]" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Password</div>
                  <div className="text-sm text-[#848e9c]">Last changed 30 days ago</div>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-[#f0b90b] hover:bg-[#f0b90b]/10 rounded-lg transition-colors">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-[#2b3139]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2b3139] rounded-lg flex items-center justify-center">
                  <Smartphone className="text-[#848e9c]" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-[#848e9c]">
                    {user.otpEnabled ? 'Enabled' : 'Add extra security to your account'}
                  </div>
                </div>
              </div>
              <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                user.otpEnabled
                  ? 'text-[#f6465d] hover:bg-[#f6465d]/10'
                  : 'bg-[#0ecb81] text-white hover:bg-[#0ecb81]/90'
              }`}>
                {user.otpEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2b3139] rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-[#848e9c]" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Verification Status</div>
                  <div className="text-sm text-[#848e9c]">
                    {user.isVerified ? 'Verified' : 'Not verified - limits apply'}
                  </div>
                </div>
              </div>
              {!user.isVerified && (
                <Link
                  href="/verification"
                  className="px-4 py-2 text-sm bg-[#f0b90b] text-black rounded-lg hover:bg-[#d9a60a] transition-colors"
                >
                  Verify Now
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#1e2329] rounded-xl p-6 border border-[#f6465d]/20">
          <h3 className="text-lg font-semibold text-[#f6465d] mb-6 flex items-center gap-2">
            <AlertTriangle size={20} />
            Danger Zone
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Block Account</div>
                <div className="text-sm text-[#848e9c]">Temporarily block your account for 7 days</div>
              </div>
              <button className="px-4 py-2 text-sm border border-[#f6465d] text-[#f6465d] rounded-lg hover:bg-[#f6465d]/10 transition-colors">
                Block
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Delete Account</div>
                <div className="text-sm text-[#848e9c]">Permanently delete your account and all data</div>
              </div>
              <button className="px-4 py-2 text-sm bg-[#f6465d] text-white rounded-lg hover:bg-[#f6465d]/90 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

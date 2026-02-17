'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#0066FF] flex items-center justify-center font-bold text-2xl">
              PD
            </div>
          </div>
          <h1 className="text-2xl font-bold">PlayerData</h1>
          <p className="text-gray-400 mt-1">Support Intelligence Hub</p>
        </div>

        {/* Login Card */}
        <div className="gradient-card rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                placeholder="you@playerdata.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#0066FF] hover:bg-[#0055DD] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white/5">
                <p className="text-gray-400">PlayerData:</p>
                <p className="font-mono text-gray-300">luke@playerdata.com</p>
                <p className="font-mono text-gray-500">playerdata2026</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <p className="text-gray-400">HummingAgent:</p>
                <p className="font-mono text-gray-300">shawn@hummingagent.ai</p>
                <p className="font-mono text-gray-500">demo2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Powered by <span className="text-[#00D4FF]">HummingAgent</span>
          </p>
        </div>
      </div>
    </div>
  );
}

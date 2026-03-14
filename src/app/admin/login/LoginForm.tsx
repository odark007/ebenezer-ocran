'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] p-3 rounded-md border border-red-100">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-bold text-g700 mb-1">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-lg px-3 py-2 text-sm outline-none focus:border-lime" 
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-g700 mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-lg px-3 py-2 text-sm outline-none focus:border-lime" 
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white text-sm font-bold py-3 rounded-lg mt-2 hover:bg-g900 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}

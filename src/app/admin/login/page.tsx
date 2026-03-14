import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-g50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[400px] p-8 bg-white rounded-xl shadow-sm border border-g100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-4 text-lime-dk text-2xl">
            <i className="ph ph-lock-key"></i>
          </div>
          <h1 className="font-serif text-2xl font-bold text-black mb-1">Admin Portal</h1>
          <p className="text-sm text-g500">Sign in to manage ministry content</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}

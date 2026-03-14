import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-g50 flex">
      {/* Sidebar Placeholder */}
      <aside className="w-[260px] bg-dark text-white flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <div className="font-serif text-lg font-bold">Rev. Ocran Admin</div>
          <div className="text-[10px] text-white/40 tracking-[0.1em] uppercase mt-1">{user.email}</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase mb-2 mt-4 px-3">Dashboard</div>
          <Link href="/admin" className="px-3 py-2 rounded-md bg-lime/10 text-lime font-medium text-sm flex items-center gap-2">
            <i className="ph ph-squares-four text-lg"></i> Overview
          </Link>
          <div className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase mb-2 mt-4 px-3">Content</div>
          <Link href="/admin/sermons" className="px-3 py-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm flex items-center gap-2 transition-colors">
            <i className="ph ph-microphone-stage text-lg"></i> Sermons
          </Link>
          <Link href="/admin/books" className="px-3 py-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm flex items-center gap-2 transition-colors">
            <i className="ph ph-book-open text-lg"></i> Books
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action="/auth/signout" method="post">
            <button className="w-full px-3 py-2 rounded-md text-white/60 hover:text-red-400 hover:bg-white/5 font-medium text-sm flex items-center gap-2 transition-colors text-left cursor-pointer border-none bg-transparent">
              <i className="ph ph-sign-out text-lg"></i> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 max-h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-serif text-[32px] font-bold text-black mb-2">Welcome Back!</h1>
          <p className="text-g500 text-[15px]">Manage the content on the Rev. Ebenezer Ocran platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-g100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center text-lime-dk text-2xl">
              <i className="ph ph-microphone-stage"></i>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-serif leading-none mb-1">0</div>
              <div className="text-xs font-semibold text-g500 uppercase tracking-[0.05em]">Sermons</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-g100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center text-lime-dk text-2xl">
              <i className="ph ph-book-open"></i>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-serif leading-none mb-1">0</div>
              <div className="text-xs font-semibold text-g500 uppercase tracking-[0.05em]">Books</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-g100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center text-lime-dk text-2xl">
              <i className="ph ph-envelope-simple"></i>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-serif leading-none mb-1">0</div>
              <div className="text-xs font-semibold text-g500 uppercase tracking-[0.05em]">Unread Emails</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-g100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center text-lime-dk text-2xl">
              <i className="ph ph-users"></i>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-serif leading-none mb-1">0</div>
              <div className="text-xs font-semibold text-g500 uppercase tracking-[0.05em]">Subscribers</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

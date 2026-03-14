export default function Admin() {
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
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-g700 mb-1">Email Address</label>
            <input type="email" className="w-full bg-g50 border-[1.5px] border-g100 rounded-lg px-3 py-2 text-sm outline-none focus:border-lime" />
          </div>
          <div>
            <label className="block text-xs font-bold text-g700 mb-1">Password</label>
            <input type="password" className="w-full bg-g50 border-[1.5px] border-g100 rounded-lg px-3 py-2 text-sm outline-none focus:border-lime" />
          </div>
          <button type="button" className="w-full bg-black text-white text-sm font-bold py-3 rounded-lg mt-2 hover:bg-g900 transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

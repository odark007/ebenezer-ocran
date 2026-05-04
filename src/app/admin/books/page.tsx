// src/app/admin/books/page.tsx (FULL & FIXED TABLE RENDERING)
import { createClient } from '@/utils/supabase/server';
import AdminBookForm from '@/components/AdminBookForm';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
// (AdminDeleteBookButton resolved previously)
import AdminDeleteBookButton from '@/components/AdminDeleteBookButton'; // NEW CLIENT COMPONENT

export const metadata = {
  title: 'Manage Books | Admin Dashboard',
};

// searchParams is a Promise<...> (Next.js 15+ API)
export default async function ManageBooks({ searchParams }: { searchParams: Promise<{ edit?: string; add?: boolean }> }) {
  const supabase = await createClient();

  // (Server-side Auth Check)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }

  // We must await searchParams before using it.
  const resolvedSearchParams = await searchParams;

  // 1. Fetch all books (ordered by display_order)
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching books:', error);
    return <div>Error loading books. Please try again.</div>;
  }

  // 2. Identify book for editing (using the resolved params)
  const bookToEdit = resolvedSearchParams.edit ? books?.find(b => b.id === resolvedSearchParams.edit) : null;
  const isEditing = !!bookToEdit || resolvedSearchParams.add;

  return (
    <div className="min-h-screen bg-g50 flex flex-col pt-[nav]">
      {/* --- UI FIX IS HERE (Sticky Header Resolved Previously) --- */}
      <header className="bg-white border-b border-g100 p-6 flex justify-between items-center sticky top-[68px] z-40">
        <div>
          <h1 className="font-serif text-[28px] font-bold text-black mb-1">Manage Books</h1>
          <p className="text-g500 text-[14px]">Add, edit, or remove books from the platform.</p>
        </div>
        {!isEditing && (
            <Link href="/admin/books?add=true" className="font-sans text-[13px] font-semibold bg-black text-white px-[20px] py-[10px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-g900">
                + Add New Book
            </Link>
        )}
      </header>

      {isEditing ? (
        // 3. Render the Form (Add/Edit Mode)
        <main className="flex-1 p-10 flex flex-col items-center">
            <div className="w-full max-w-[700px]">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-[22px] font-bold text-black">{bookToEdit ? 'Edit Book' : 'Add New Book'}</h2>
                    <Link href="/admin/books" className="text-xs font-semibold text-g500 hover:text-black">
                        ← Back to List
                    </Link>
                </div>
                <div className="bg-white p-8 rounded-xl border border-g100 shadow-sm">
                    <AdminBookForm book={bookToEdit} />
                </div>
            </div>
        </main>
      ) : (
        // 4. Render the Books Table (Overview Mode)
        <main className="flex-1 p-10">
          <div className="bg-white rounded-xl border border-g100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              {/* --- FIX IS HERE --- */}
              {/* Line 81: The '<thead>' must always render, regardless of 'books.length' */}
              <thead className="bg-g50 border-b border-g100">
                <tr>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-12">#</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-20">Portrait</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider">Title</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-24">Order</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-32">Badge</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-32">Status</th>
                  <th className="p-4 text-xs font-semibold text-g500 uppercase tracking-wider w-36 text-right">Actions</th>
                </tr>
              </thead>
              
              {/* --- FIX IS HERE --- */}
              {/* Line 94: We only switch content inside the '<tbody>' */}
              <tbody className="divide-y divide-g100">
                {books && books.length > 0 ? (
                  books.map((book, index) => (
                    // ... (existing book row logic remains same)
                    <tr key={book.id} className="hover:bg-g50 transition-colors">
                      <td className="p-4 text-[13px] text-g500">{index + 1}</td>
                      <td className="p-4">
                          <div className="w-10 h-14 bg-g100 rounded border border-lime/10 overflow-hidden relative">
                          {book.cover_image_url ? (
                              <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center text-lime/40"><i className="ph ph-image text-lg"></i></div>
                        )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[14.5px] font-medium text-black leading-tight">{book.title}</div>
                        <Link href={`/books/${book.slug}`} target="_blank" className="text-[11px] text-g500 hover:text-lime-dk hover:underline">/{book.slug}</Link>
                      </td>
                      <td className="p-4 text-[13.5px] text-black font-medium">{book.display_order}</td>
                      <td className="p-4">
                        {book.badge && (
                          <span className="text-[10px] font-bold bg-lime text-black px-[8px] py-[3px] rounded-full uppercase tracking-wider">{book.badge}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`text-[11px] font-semibold px-[9px] py-[4px] rounded-full uppercase tracking-wider ${book.status === 'published' ? 'bg-lime-pale text-black' : 'bg-g100 text-g700'}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <Link href={`/admin/books?edit=${book.id}`} className="text-[11px] font-semibold bg-g100 text-g700 px-[14px] py-[7px] rounded-[5px] hover:bg-g300 hover:text-black">
                          <i className="ph ph-pencil-simple-line"></i> Edit
                        </Link>
                        <AdminDeleteBookButton bookId={book.id} imageUrl={book.cover_image_url!} />
                      </td>
                    </tr>
                  ))
                ) : (
                    // --- SYNTAX FIX APPLIED PREVIOUSLY, STRUCTURAL FIX HERE ---
                    // This row is now correctly placed inside 'tbody'.
                    <tr>
                        <td colSpan={7} className="p-10 text-center text-g500 text-[15px]">No books found. Click "+ Add New Book" to begin.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
}
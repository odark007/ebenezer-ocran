// src/app/admin/books/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdminBookForm from '@/components/AdminBookForm';
import AdminDeleteBookButton from '@/components/AdminDeleteBookButton';
import TopicsManager from '@/components/TopicsManager';

export const metadata = { title: 'Manage Books | Admin Dashboard' };

export default async function ManageBooks({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; add?: string; tab?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const params = await searchParams;
  const activeTab = params.tab || 'books';

  const { data: books } = await supabase
    .from('books')
    .select('*, book_topics(name)')
    .order('display_order', { ascending: true });

  const { data: topicsList } = await supabase
    .from('book_topics')
    .select('*')
    .order('display_order', { ascending: true });

  const topics = topicsList || [];
  const allBooks = books || [];

  const bookToEdit = params.edit ? allBooks.find((b) => b.id === params.edit) : null;
  const isEditing = !!bookToEdit || !!params.add;

  return (
    <div className="min-h-screen bg-g50 flex pt-[68px]">
      {/* Sidebar — matches /admin layout */}
      <aside className="w-[260px] bg-dark text-white flex flex-col h-[calc(100vh-68px)] sticky top-[68px]">
        <div className="p-6 border-b border-white/10">
          <div className="font-serif text-lg font-bold">Rev. Ocran Admin</div>
          <div className="text-[10px] text-white/40 tracking-[0.1em] uppercase mt-1">{user.email}</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase mb-2 mt-4 px-3">Dashboard</div>
          <Link href="/admin" className="px-3 py-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm flex items-center gap-2 transition-colors">
            <i className="ph ph-squares-four text-lg"></i> Overview
          </Link>
          <div className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase mb-2 mt-4 px-3">Content</div>
          <Link href="/admin/sermons" className="px-3 py-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm flex items-center gap-2 transition-colors">
            <i className="ph ph-microphone-stage text-lg"></i> Sermons
          </Link>
          <Link href="/admin/books" className="px-3 py-2 rounded-md bg-lime/10 text-lime font-medium text-sm flex items-center gap-2">
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-g100 px-8 pt-6 pb-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="font-serif text-[28px] font-bold text-black mb-1">Manage Books</h1>
              <p className="text-g500 text-[14px]">Add, edit, and manage books and topics.</p>
            </div>
            {activeTab === 'books' && !isEditing && (
              <Link href="/admin/books?add=true"
                className="font-sans text-[13px] font-semibold bg-black text-white px-[20px] py-[10px] rounded-[7px] hover:bg-g900">
                + Add Book
              </Link>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-1">
              <Link href="/admin/books?tab=books"
                className={`px-[16px] py-[9px] text-[13px] font-semibold rounded-t-[6px] border-b-2 transition-colors ${
                  activeTab === 'books' ? 'border-black text-black bg-white' : 'border-transparent text-g500 hover:text-black'
                }`}>
                <i className="ph ph-book-open mr-1.5"></i>Books ({allBooks.length})
              </Link>
              <Link href="/admin/books?tab=topics"
                className={`px-[16px] py-[9px] text-[13px] font-semibold rounded-t-[6px] border-b-2 transition-colors ${
                  activeTab === 'topics' ? 'border-black text-black bg-white' : 'border-transparent text-g500 hover:text-black'
                }`}>
                <i className="ph ph-tag mr-1.5"></i>Topics ({topics.length})
              </Link>
            </div>
          )}
        </header>

        {/* Content */}
        {isEditing ? (
          <main className="flex-1 p-10 flex flex-col items-center">
            <div className="w-full max-w-[800px]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-[22px] font-bold text-black">
                  {bookToEdit ? 'Edit Book' : 'Add New Book'}
                </h2>
                <Link href="/admin/books" className="text-xs font-semibold text-g500 hover:text-black">
                  ← Back to List
                </Link>
              </div>
              <div className="bg-white p-8 rounded-xl border border-g100 shadow-sm">
                <AdminBookForm
                  book={bookToEdit || undefined}
                  topicsList={topics}
                  allBooks={allBooks.map((b) => ({ id: b.id, title: b.title }))}
                />
              </div>
            </div>
          </main>
        ) : activeTab === 'topics' ? (
          <main className="flex-1 p-10">
            <TopicsManager topicsList={topics} />
          </main>
        ) : (
          <main className="flex-1 p-10 pt-6">
            <div className="bg-white rounded-xl border border-g100 shadow-sm overflow-hidden mt-2">
              <table className="w-full text-left">
                <thead className="bg-g50 border-b border-g100">
                  <tr>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-10">#</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-16">Cover</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider">Title</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-32">Topic</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-24">Featured</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-24">Order</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-28">Status</th>
                    <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-36 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-g100">
                  {allBooks.length > 0 ? (
                    allBooks.map((book, index) => (
                      <tr key={book.id} className="hover:bg-g50 transition-colors">
                        <td className="p-4 text-[13px] text-g500">{index + 1}</td>
                        <td className="p-4">
                          <div className="w-9 h-16 bg-g100 rounded border border-g100 overflow-hidden relative">
                            {book.cover_image_url ? (
                              <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-g300">
                                <i className="ph ph-book text-lg"></i>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-[14px] font-medium text-black leading-tight">{book.title}</div>
                          {book.blurb && <div className="text-[11px] text-g500 mt-0.5 truncate max-w-[240px]">{book.blurb}</div>}
                          <Link href={`/books/${book.slug}`} target="_blank"
                            className="text-[10px] text-g300 hover:text-lime-dk hover:underline">
                            /books/{book.slug}
                          </Link>
                        </td>
                        <td className="p-4 text-[13px] text-g700">
                          {book.book_topics?.name || <span className="text-g300 italic">None</span>}
                        </td>
                        <td className="p-4">
                          {book.is_featured ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black bg-lime px-[8px] py-[3px] rounded-full">
                              <i className="ph ph-star-fill"></i> Featured
                            </span>
                          ) : <span className="text-g300">—</span>}
                        </td>
                        <td className="p-4 text-[13px] text-black font-medium">{book.display_order}</td>
                        <td className="p-4">
                          <span className={`text-[11px] font-semibold px-[9px] py-[4px] rounded-full uppercase tracking-wider ${
                            book.status === 'published' ? 'bg-lime-pale text-black' : 'bg-g100 text-g700'
                          }`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1.5">
                          <Link href={`/admin/books?edit=${book.id}`}
                            className="text-[11px] font-semibold bg-g100 text-g700 px-[14px] py-[7px] rounded-[5px] hover:bg-g300 hover:text-black">
                            <i className="ph ph-pencil-simple-line"></i> Edit
                          </Link>
                          <AdminDeleteBookButton bookId={book.id} imageUrl={book.cover_image_url} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-10 text-center text-g500 text-[15px]">
                        No books yet. Click &quot;+ Add Book&quot; to begin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

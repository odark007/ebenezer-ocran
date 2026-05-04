// src/app/admin/sermons/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminSermonForm from '@/components/AdminSermonForm';
import AdminDeleteSermonButton from '@/components/AdminDeleteSermonButton';
import SeriesManager from '@/components/SeriesManager';

export const metadata = { title: 'Manage Sermons | Admin Dashboard' };

export default async function ManageSermons({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; add?: string; tab?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const params = await searchParams;
  const activeTab = params.tab || 'sermons';

  // Fetch sermons with series name joined
  const { data: sermons, error: sermonsError } = await supabase
    .from('sermons')
    .select('*, sermon_series(name)')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  // Fetch all series for dropdown
  const { data: seriesList } = await supabase
    .from('sermon_series')
    .select('*')
    .order('display_order', { ascending: true });

  const seriesData = seriesList || [];

  const sermonToEdit = params.edit
    ? sermons?.find((s) => s.id === params.edit)
    : null;
  const isEditing = !!sermonToEdit || !!params.add;

  return (
    <div className="min-h-screen bg-g50 flex flex-col pt-[68px]">
      {/* Header */}
      <header className="bg-white border-b border-g100 px-8 pt-6 sticky top-[68px] z-40">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="font-serif text-[28px] font-bold text-black mb-1">Manage Sermons</h1>
            <p className="text-g500 text-[14px]">
              Add, edit, and manage sermons and teaching series.
            </p>
          </div>
          {activeTab === 'sermons' && !isEditing && (
            <Link
              href="/admin/sermons?add=true"
              className="font-sans text-[13px] font-semibold bg-black text-white px-[20px] py-[10px] rounded-[7px] hover:bg-g900"
            >
              + Add Sermon
            </Link>
          )}
        </div>

        {/* Tabs — only shown when not in edit/add mode */}
        {!isEditing && (
          <div className="flex gap-1">
            <Link
              href="/admin/sermons?tab=sermons"
              className={`px-[16px] py-[9px] text-[13px] font-semibold rounded-t-[6px] border-b-2 transition-colors ${
                activeTab === 'sermons'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-g500 hover:text-black'
              }`}
            >
              <i className="ph ph-microphone-stage mr-1.5"></i>Sermons ({sermons?.length || 0})
            </Link>
            <Link
              href="/admin/sermons?tab=series"
              className={`px-[16px] py-[9px] text-[13px] font-semibold rounded-t-[6px] border-b-2 transition-colors ${
                activeTab === 'series'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-g500 hover:text-black'
              }`}
            >
              <i className="ph ph-tag mr-1.5"></i>Series ({seriesData.length})
            </Link>
          </div>
        )}
      </header>

      {/* Content */}
      {isEditing ? (
        <main className="flex-1 p-10 flex flex-col items-center">
          <div className="w-full max-w-[720px]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-[22px] font-bold text-black">
                {sermonToEdit ? 'Edit Sermon' : 'Add New Sermon'}
              </h2>
              <Link href="/admin/sermons" className="text-xs font-semibold text-g500 hover:text-black">
                ← Back to List
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border border-g100 shadow-sm">
              <AdminSermonForm sermon={sermonToEdit || undefined} seriesList={seriesData} />
            </div>
          </div>
        </main>
      ) : activeTab === 'series' ? (
        <main className="flex-1 p-10">
          <SeriesManager seriesList={seriesData} />
        </main>
      ) : (
        <main className="flex-1 p-10">
          <div className="bg-white rounded-xl border border-g100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-g50 border-b border-g100">
                <tr>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-10">#</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider">Title</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-28">Type</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-36">Series</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-24">Featured</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-28">Status</th>
                  <th className="p-4 text-[11px] font-bold text-g500 uppercase tracking-wider w-36 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-g100">
                {sermons && sermons.length > 0 ? (
                  sermons.map((sermon, index) => (
                    <tr key={sermon.id} className="hover:bg-g50 transition-colors">
                      <td className="p-4 text-[13px] text-g500">{index + 1}</td>
                      <td className="p-4">
                        <div className="text-[14px] font-medium text-black leading-tight">
                          {sermon.title}
                        </div>
                        {sermon.scripture_ref && (
                          <div className="text-[11px] text-g500 mt-0.5 italic">{sermon.scripture_ref}</div>
                        )}
                        <div className="flex gap-1.5 mt-1">
                          {sermon.notes_url && (
                            <span className="text-[9px] font-bold bg-lime-pale text-black px-[6px] py-[2px] rounded-full uppercase tracking-wider">Notes</span>
                          )}
                          {sermon.podbean_url && (
                            <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-[6px] py-[2px] rounded-full uppercase tracking-wider">Podbean</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] font-bold bg-lime/10 text-black px-[8px] py-[3px] rounded-full uppercase tracking-wider">
                          {sermon.type}
                        </span>
                      </td>
                      <td className="p-4 text-[13px] text-g700">
                        {sermon.sermon_series?.name || <span className="text-g300 italic">None</span>}
                      </td>
                      <td className="p-4">
                        {sermon.is_featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black bg-lime px-[8px] py-[3px] rounded-full">
                            <i className="ph ph-star-fill"></i> Featured
                          </span>
                        ) : (
                          <span className="text-[11px] text-g300">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[11px] font-semibold px-[9px] py-[4px] rounded-full uppercase tracking-wider ${
                            sermon.status === 'published'
                              ? 'bg-lime-pale text-black'
                              : 'bg-g100 text-g700'
                          }`}
                        >
                          {sermon.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <Link
                          href={`/admin/sermons?edit=${sermon.id}`}
                          className="text-[11px] font-semibold bg-g100 text-g700 px-[14px] py-[7px] rounded-[5px] hover:bg-g300 hover:text-black"
                        >
                          <i className="ph ph-pencil-simple-line"></i> Edit
                        </Link>
                        <AdminDeleteSermonButton
                          sermonId={sermon.id}
                          notesUrl={sermon.notes_url}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-g500 text-[15px]">
                      No sermons yet. Click &quot;+ Add Sermon&quot; to begin.
                    </td>
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

'use client';

import { useState, useTransition, useActionState } from 'react';
import { upsertTopic, deleteTopic } from '@/app/admin/books/actions';

interface Topic {
  id: string;
  name: string;
  display_order: number;
}

export default function TopicsManager({ topicsList }: { topicsList: Topic[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [, addAction] = useActionState(upsertTopic, undefined);
  const [, editAction] = useActionState(upsertTopic, undefined);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this topic? Books using it will lose their topic.')) return;
    startTransition(async () => { await deleteTopic(id); });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-g500">Topics available in the book form dropdown.</p>
        <button
          onClick={() => setShowAdd((p) => !p)}
          className="text-[12px] font-semibold bg-black text-white px-[16px] py-[8px] rounded-[6px] hover:bg-g900 border-none cursor-pointer"
        >
          + Add Topic
        </button>
      </div>

      {showAdd && (
        <form
          action={async (fd) => { await addAction(fd); setShowAdd(false); }}
          className="bg-lime-pale border border-lime/30 rounded-[10px] p-4 flex gap-3 items-end"
        >
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-g700 mb-1">Topic Name</label>
            <input type="text" name="name" required autoFocus
              className="w-full bg-white border-[1.5px] border-g100 rounded-[7px] px-[12px] py-[8px] text-[13px] outline-none focus:border-lime"
              placeholder="e.g., Leadership"
            />
          </div>
          <div className="w-[80px]">
            <label className="block text-[11px] font-bold text-g700 mb-1">Order</label>
            <input type="number" name="display_order" defaultValue={topicsList.length} min={0}
              className="w-full bg-white border-[1.5px] border-g100 rounded-[7px] px-[12px] py-[8px] text-[13px] outline-none focus:border-lime"
            />
          </div>
          <button type="submit" className="bg-black text-white text-[12px] font-bold px-[16px] py-[9px] rounded-[7px] border-none cursor-pointer hover:bg-g900">Save</button>
          <button type="button" onClick={() => setShowAdd(false)} className="bg-g100 text-g700 text-[12px] font-semibold px-[12px] py-[9px] rounded-[7px] border-none cursor-pointer hover:bg-g300">Cancel</button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-g100 overflow-hidden">
        {topicsList.length === 0 ? (
          <div className="p-8 text-center text-g500 text-[14px]">No topics yet. Add one above.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-g50 border-b border-g100">
              <tr>
                <th className="p-3 text-[11px] font-bold text-g500 uppercase tracking-wider">Name</th>
                <th className="p-3 text-[11px] font-bold text-g500 uppercase tracking-wider w-20">Order</th>
                <th className="p-3 text-[11px] font-bold text-g500 uppercase tracking-wider w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-g100">
              {topicsList.map((t) =>
                editingId === t.id ? (
                  <tr key={t.id} className="bg-lime-pale/30">
                    <td colSpan={3} className="p-3">
                      <form
                        action={async (fd) => { await editAction(fd); setEditingId(null); }}
                        className="flex gap-3 items-end"
                      >
                        <input type="hidden" name="id" value={t.id} />
                        <div className="flex-1">
                          <input type="text" name="name" defaultValue={t.name} required autoFocus
                            className="w-full bg-white border-[1.5px] border-lime rounded-[7px] px-[12px] py-[7px] text-[13px] outline-none"
                          />
                        </div>
                        <div className="w-[80px]">
                          <input type="number" name="display_order" defaultValue={t.display_order} min={0}
                            className="w-full bg-white border-[1.5px] border-g100 rounded-[7px] px-[12px] py-[7px] text-[13px] outline-none focus:border-lime"
                          />
                        </div>
                        <button type="submit" className="bg-black text-white text-[11px] font-bold px-[14px] py-[8px] rounded-[6px] border-none cursor-pointer">Save</button>
                        <button type="button" onClick={() => setEditingId(null)} className="bg-g100 text-g700 text-[11px] font-semibold px-[10px] py-[8px] rounded-[6px] border-none cursor-pointer">Cancel</button>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id} className="hover:bg-g50">
                    <td className="p-3 text-[14px] text-black font-medium">{t.name}</td>
                    <td className="p-3 text-[13px] text-g500">{t.display_order}</td>
                    <td className="p-3 text-right space-x-1.5">
                      <button onClick={() => setEditingId(t.id)}
                        className="text-[11px] font-semibold bg-g100 text-g700 px-[12px] py-[6px] rounded-[5px] hover:bg-g300 border-none cursor-pointer">
                        <i className="ph ph-pencil-simple-line"></i> Edit
                      </button>
                      <button onClick={() => handleDelete(t.id)} disabled={isPending}
                        className="text-[11px] font-semibold bg-red-50 text-red-500 px-[12px] py-[6px] rounded-[5px] hover:bg-red-100 border-none cursor-pointer disabled:opacity-50">
                        <i className="ph ph-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

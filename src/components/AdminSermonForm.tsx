'use client';

import { useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { upsertSermon } from '@/app/admin/sermons/actions';

interface Series {
  id: string;
  name: string;
}

interface Sermon {
  id?: string;
  title?: string;
  type?: string;
  series_id?: string;
  youtube_url?: string;
  scripture_ref?: string;
  description?: string;
  podbean_url?: string;
  notes_url?: string;
  status?: string;
  display_order?: number;
  is_featured?: boolean;
}

export default function AdminSermonForm({
  sermon,
  seriesList,
}: {
  sermon?: Sermon;
  seriesList: Series[];
}) {
  const [state, action] = useActionState(upsertSermon, null as any);
  const [isFeatured, setIsFeatured] = useState(sermon?.is_featured || false);
  const [notesName, setNotesName] = useState<string | null>(null);
  const notesInputRef = useRef<HTMLInputElement>(null);

  // Extract YouTube video ID for preview
  const getYouTubeId = (url: string) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };
  const [ytUrl, setYtUrl] = useState(sermon?.youtube_url || '');
  const ytId = getYouTubeId(ytUrl);

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 text-[13.5px] p-4 rounded-lg border border-red-100">
          Error: {state.error}
        </div>
      )}

      {/* Hidden fields */}
      {sermon?.id && <input type="hidden" name="id" value={sermon.id} />}
      {sermon?.notes_url && <input type="hidden" name="old_notes_url" value={sermon.notes_url} />}
      <input type="hidden" name="is_featured" value={isFeatured.toString()} />

      {/* Title */}
      <div>
        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
          Sermon Title *
        </label>
        <input
          type="text"
          name="title"
          defaultValue={sermon?.title}
          required
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
          placeholder="e.g., The Heart of the Shepherd"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Type */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Content Type *
          </label>
          <select
            name="type"
            defaultValue={sermon?.type || 'Video'}
            required
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime cursor-pointer appearance-none"
          >
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
            <option value="Series">Series</option>
          </select>
        </div>

        {/* Series */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Series / Category *
          </label>
          <select
            name="series_id"
            defaultValue={sermon?.series_id || ''}
            required
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime cursor-pointer appearance-none"
          >
            <option value="">Select a series...</option>
            {seriesList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-[10.5px] text-g500 mt-1 font-light">
            Manage series in the &quot;Series&quot; tab.
          </p>
        </div>
      </div>

      {/* YouTube URL */}
      <div>
        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
          YouTube URL *
        </label>
        <input
          type="url"
          name="youtube_url"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
          required
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
          placeholder="https://www.youtube.com/watch?v=..."
        />
        {/* YouTube preview */}
        {ytId && (
          <div className="mt-3 rounded-[8px] overflow-hidden aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}`}
              className="w-full h-full"
              allowFullScreen
              title="YouTube preview"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scripture Reference */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Scripture Reference{' '}
            <span className="text-g300 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="scripture_ref"
            defaultValue={sermon?.scripture_ref || ''}
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
            placeholder="e.g., John 10:11"
          />
        </div>

        {/* Podbean URL */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Podbean URL <span className="text-g300 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            name="podbean_url"
            defaultValue={sermon?.podbean_url || ''}
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
            placeholder="https://icgcnltmedia.podbean.com/..."
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
          Description <span className="text-g300 font-normal">(optional)</span>
        </label>
        <textarea
          name="description"
          defaultValue={sermon?.description || ''}
          rows={3}
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[12px] text-[14px] outline-none transition-colors focus:border-lime resize-y min-h-[80px]"
          placeholder="Brief description of this sermon..."
        />
      </div>

      {/* Notes PDF Upload */}
      <div>
        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
          Sermon Notes PDF <span className="text-g300 font-normal">(optional)</span>
        </label>
        <div
          className="flex items-center gap-3 bg-g50 border-[1.5px] border-dashed border-g300 rounded-[8px] px-[14px] py-[10px] cursor-pointer hover:border-lime transition-colors"
          onClick={() => notesInputRef.current?.click()}
        >
          <i className="ph ph-file-pdf text-[22px] text-g500"></i>
          <div>
            <div className="text-[13px] text-g700 font-medium">
              {notesName || (sermon?.notes_url ? 'Replace existing notes' : 'Upload PDF notes')}
            </div>
            {sermon?.notes_url && !notesName && (
              <div className="text-[11px] text-lime-dk font-medium">Existing notes on file ✓</div>
            )}
          </div>
        </div>
        <input
          type="file"
          name="notes_file"
          ref={notesInputRef}
          accept="application/pdf"
          className="hidden"
          onChange={(e) => setNotesName(e.target.files?.[0]?.name || null)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Status *
          </label>
          <select
            name="status"
            defaultValue={sermon?.status || 'draft'}
            required
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime cursor-pointer appearance-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Display Order
          </label>
          <input
            type="number"
            name="display_order"
            defaultValue={sermon?.display_order || 0}
            min={0}
            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
          />
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Featured on Homepage
          </label>
          <button
            type="button"
            onClick={() => setIsFeatured((p) => !p)}
            className={`w-full flex items-center justify-center gap-2 px-[14px] py-[10px] rounded-[8px] border-[1.5px] text-[13px] font-semibold transition-all ${
              isFeatured
                ? 'bg-lime border-lime text-black'
                : 'bg-g50 border-g100 text-g500 hover:border-lime'
            }`}
          >
            <i className={`ph ph-star${isFeatured ? '-fill' : ''} text-[16px]`}></i>
            {isFeatured ? 'Featured ✓' : 'Set as Featured'}
          </button>
          <p className="text-[10.5px] text-g500 mt-1 font-light">
            Only one sermon can be featured at a time.
          </p>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white text-[14.5px] font-bold py-[14px] rounded-[8px] transition-colors hover:bg-g900 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <i className="ph ph-spinner animate-spin text-lime"></i> Saving...
        </>
      ) : (
        <>
          <i className="ph ph-floppy-disk text-lg"></i> Save Sermon
        </>
      )}
    </button>
  );
}

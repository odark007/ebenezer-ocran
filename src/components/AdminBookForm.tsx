'use client';

import { useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { upsertBook } from '@/app/admin/books/actions';
import Image from 'next/image';

interface Topic {
  id: string;
  name: string;
}

interface Book {
  id?: string;
  title?: string;
  slug?: string;
  amazon_url?: string;
  blurb?: string;
  full_description?: string;
  topic_id?: string;
  badge?: string;
  display_order?: number;
  status?: string;
  is_featured?: boolean;
  cover_image_url?: string;
  related_book_ids?: string[];
}

interface AllBook {
  id: string;
  title: string;
}

export default function AdminBookForm({
  book,
  topicsList,
  allBooks,
}: {
  book?: Book;
  topicsList: Topic[];
  allBooks: AllBook[];
}) {
  const [state, action] = useActionState(upsertBook, null as any);
  const [isFeatured, setIsFeatured] = useState(book?.is_featured || false);
  const [coverPreview, setCoverPreview] = useState<string | null>(book?.cover_image_url || null);
  const [selectedRelated, setSelectedRelated] = useState<string[]>(book?.related_book_ids || []);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const toggleRelated = (bookId: string) => {
    setSelectedRelated((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 text-[13.5px] p-4 rounded-lg border border-red-100">
          Error: {state.error}
        </div>
      )}

      {/* Hidden fields */}
      {book?.id && <input type="hidden" name="id" value={book.id} />}
      {book?.cover_image_url && <input type="hidden" name="oldImageUrl" value={book.cover_image_url} />}
      <input type="hidden" name="isFeatured" value={isFeatured.toString()} />
      <input type="hidden" name="relatedBookIds" value={JSON.stringify(selectedRelated)} />

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
        {/* Cover Image Upload (9:16 portrait) */}
        <div className="space-y-3">
          <label className="block text-[12px] font-bold text-g700 tracking-[0.02em]">
            Book Cover (9:16) *
          </label>
          <div
            className="w-[160px] h-[284px] bg-g100 rounded-lg border-2 border-dashed border-g300 overflow-hidden relative flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:border-lime transition-colors"
            onClick={() => coverInputRef.current?.click()}
          >
            {coverPreview ? (
              <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
            ) : (
              <>
                <i className="ph ph-book text-[32px] text-g500 mb-2"></i>
                <div className="text-[11px] text-g500">Click to upload</div>
                <div className="text-[10px] text-lime-dk font-medium mt-1 uppercase tracking-wider">9:16 Portrait</div>
              </>
            )}
          </div>
          <input
            type="file"
            name="portrait"
            ref={coverInputRef}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setCoverPreview(URL.createObjectURL(file));
              else setCoverPreview(book?.cover_image_url || null);
            }}
          />
          <p className="text-[10.5px] text-g500 font-light leading-relaxed w-[160px]">
            JPEG/PNG/WEBP. Portrait orientation only.
          </p>
        </div>

        {/* Main fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Book Title *</label>
            <input
              type="text" name="title" defaultValue={book?.title} required
              className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime"
              placeholder="e.g., Becoming an Extraordinary Christian"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
              Short Blurb <span className="text-g300 font-normal">(shown on card)</span>
            </label>
            <input
              type="text" name="blurb" defaultValue={book?.blurb || ''}
              className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime"
              placeholder="One-line description for the book card"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Amazon URL *</label>
            <input
              type="text" name="amazonUrl" defaultValue={book?.amazon_url} required
              className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime"
              placeholder="https://amazon.com/dp/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Topic</label>
              <select
                name="topicId" defaultValue={book?.topic_id || ''}
                className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime cursor-pointer appearance-none"
              >
                <option value="">No topic</option>
                {topicsList.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Badge</label>
              <input
                type="text" name="badge" defaultValue={book?.badge || ''}
                className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime"
                placeholder="e.g., New, Featured, Bestseller"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Display Order</label>
              <input
                type="number" name="displayOrder" defaultValue={book?.display_order || 0} min={0}
                className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Status *</label>
              <select
                name="status" defaultValue={book?.status || 'draft'} required
                className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none focus:border-lime cursor-pointer appearance-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Featured</label>
              <button
                type="button"
                onClick={() => setIsFeatured((p) => !p)}
                className={`w-full flex items-center justify-center gap-2 px-[14px] py-[10px] rounded-[8px] border-[1.5px] text-[13px] font-semibold transition-all ${
                  isFeatured ? 'bg-lime border-lime text-black' : 'bg-g50 border-g100 text-g500 hover:border-lime'
                }`}
              >
                <i className={`ph ph-star${isFeatured ? '-fill' : ''} text-[16px]`}></i>
                {isFeatured ? 'Featured ✓' : 'Set Featured'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
          Full Description <span className="text-g300 font-normal">(shown on book detail page)</span>
        </label>
        <textarea
          name="fullDescription" defaultValue={book?.full_description || ''} rows={6}
          className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[12px] text-[14px] outline-none focus:border-lime resize-y min-h-[120px]"
          placeholder="Detailed description of the book — shown on the individual book page..."
        />
      </div>

      {/* Related Books */}
      {allBooks.length > 0 && (
        <div>
          <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">
            Related Books <span className="text-g300 font-normal">(admin override — auto-suggests by topic if none selected)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-g50 border border-g100 rounded-[8px] p-3 max-h-[200px] overflow-y-auto">
            {allBooks
              .filter((b) => b.id !== book?.id)
              .map((b) => (
                <label
                  key={b.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] cursor-pointer text-[12.5px] transition-colors ${
                    selectedRelated.includes(b.id)
                      ? 'bg-lime text-black font-semibold'
                      : 'bg-white border border-g100 text-g700 hover:border-lime'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedRelated.includes(b.id)}
                    onChange={() => toggleRelated(b.id)}
                  />
                  <i className={`ph ph-${selectedRelated.includes(b.id) ? 'check-circle-fill' : 'circle'} text-[14px]`}></i>
                  <span className="truncate">{b.title}</span>
                </label>
              ))}
          </div>
          <p className="text-[10.5px] text-g500 mt-1 font-light">
            Select books to show as recommendations. Leave empty to auto-suggest by topic.
          </p>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit" disabled={pending}
      className="w-full bg-black text-white text-[14.5px] font-bold py-[14px] rounded-[8px] transition-colors hover:bg-g900 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {pending ? (
        <><i className="ph ph-spinner animate-spin text-lime"></i> Saving...</>
      ) : (
        <><i className="ph ph-floppy-disk text-lg"></i> Save Book</>
      )}
    </button>
  );
}

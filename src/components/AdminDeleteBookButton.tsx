'use client';

import { useState, useTransition } from 'react';
import { deleteBook } from '@/app/admin/books/actions';

export default function AdminDeleteBookButton({
  bookId,
  imageUrl,
}: {
  bookId: string;
  imageUrl: string | null;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBook(bookId, imageUrl);
      setConfirming(false);
    });
  };

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button onClick={handleDelete} disabled={isPending}
          className="text-[11px] font-semibold bg-red-500 text-white px-[10px] py-[7px] rounded-[5px] hover:bg-red-600 disabled:opacity-50 cursor-pointer border-none">
          {isPending ? '...' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)}
          className="text-[11px] font-semibold bg-g100 text-g700 px-[10px] py-[7px] rounded-[5px] hover:bg-g300 cursor-pointer border-none">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)}
      className="text-[11px] font-semibold bg-red-50 text-red-500 px-[14px] py-[7px] rounded-[5px] hover:bg-red-100 cursor-pointer border-none">
      <i className="ph ph-trash"></i> Delete
    </button>
  );
}

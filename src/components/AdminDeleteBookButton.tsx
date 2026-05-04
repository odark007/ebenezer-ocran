// src/components/AdminDeleteBookButton.tsx
'use client';

// (Import from standard locations, not actions.ts, as this is a Client Component)
import { useFormStatus } from 'react-dom';
import { deleteBook } from '@/app/admin/books/actions'; // Still reference the action

interface DeleteBookProps {
  bookId: string;
  imageUrl?: string;
}

export default function AdminDeleteBookButton({ bookId, imageUrl }: DeleteBookProps) {
  const { pending } = useFormStatus();

  // (Client-side interactive confirmation logic)
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Confirm with the user
    if (!confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
        return; // User cancelled, exit
    }

    // 2. (Visual/Accessibility State Management)
    // You could set a 'deleting' state here if needed for richer feedback.

    try {
        // 3. SECURE: Call the delete action with bound parameters
        await deleteBook(bookId, imageUrl!); 
    } catch (e) {
        // Handle action-level errors gracefully if needed.
        console.error("Delete Action Failed:", e);
    }
  };

  return (
    <form action={deleteBook.bind(null, bookId, imageUrl!)} className="inline">
        <button 
            type="submit" 
            disabled={pending}
            className="text-[11px] font-semibold bg-red-50 text-red-600 px-[14px] py-[7px] rounded-[5px] hover:bg-red-100 cursor-pointer transition-colors border-none disabled:opacity-50" 
            // 4. FIX: We can attach onClick handler safely within a Client Component
            onClick={handleDelete}
        >
            {pending ? (
                <>
                    <i className="ph ph-spinner animate-spin text-red-400"></i>
                </>
            ) : (
                <>
                    <i className="ph ph-trash"></i>
                </>
            )}
            Delete
        </button>
    </form>
  );
}
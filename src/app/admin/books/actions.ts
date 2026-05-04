'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // Requires 'npm i uuid @types/uuid'

const BUCKET_NAME = 'books';
const PUBLIC_BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`;

// 1. Core Action: Add or Edit a Book entry
export async function upsertBook(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // (Server-side Auth Check)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized.');
  }

  // Extract fields
  const id = formData.get('id') as string || uuidv4();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string || title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const amazon_url = formData.get('amazonUrl') as string;
  const portrait_file = formData.get('portrait') as File;
  const badge = formData.get('badge') as string;
  const display_order = parseInt(formData.get('displayOrder') as string) || 0;
  const status = formData.get('status') as 'published' | 'draft';
  const old_image_url = formData.get('oldImageUrl') as string;

  let final_image_url = old_image_url;
  let portrait_changed = false;

  // -- 1a. Process Portrait Upload to Supabase Storage
  if (portrait_file && portrait_file.size > 0 && portrait_file.name !== 'undefined') {
    portrait_changed = true;
    
    // (A) Upload unique filename to Supabase Storage
    const fileName = `covers/${id}/portrait_${uuidv4()}.jpg`; // Unique path
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, portrait_file, {
        cacheControl: '3600',
        upsert: false // We create a unique name
      });

    if (uploadError) {
      throw new Error(`Failed to upload portrait to storage: ${uploadError.message}`);
    }

    // (B) Construct the new final URL
    final_image_url = `${PUBLIC_BASE_URL}${fileName}`;
  }

  // -- 1b. Update or Insert Database Record
  const bookData = {
    id, title, slug, amazon_url, badge, display_order, status,
    cover_image_url: final_image_url, // Update with new URL or maintain old
    updated_at: new Date().toISOString()
  };

  const { error: upsertError } = await supabase
    .from('books')
    .upsert(bookData);

  if (upsertError) {
    // (C) CLEANUP: If DB update fails, delete the orphaned image if we uploaded one
    if (portrait_changed && final_image_url !== old_image_url) {
        const fileToDelete = final_image_url.replace(PUBLIC_BASE_URL, '');
        await supabase.storage.from(BUCKET_NAME).remove([fileToDelete]);
    }
    throw new Error(`Failed to save book to database: ${upsertError.message}`);
  }

  // -- 1c. CLEANUP: If edit and portrait changed, delete the old image
  if (portrait_changed && old_image_url) {
    const fileToDelete = old_image_url.replace(PUBLIC_BASE_URL, '');
    await supabase.storage.from(BUCKET_NAME).remove([fileToDelete]);
  }

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath(`/books/${slug}`);
  redirect('/admin/books');
}


// 2. Core Action: Delete a Book entry (with cascading image deletion)
export async function deleteBook(id: string, image_url: string) {
  const supabase = await createClient();

  // (Server-side Auth Check)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized.');
  }

  // -- 2a. Delete Database Record
  const { error: deleteError } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (deleteError) {
    throw new Error(`Failed to delete book from database: ${deleteError.message}`);
  }

  // -- 2b. Cascading Image Deletion: Delete the object from Storage
  if (image_url && image_url.startsWith(PUBLIC_BASE_URL)) {
    const fileToDelete = image_url.replace(PUBLIC_BASE_URL, '');
    await supabase.storage.from(BUCKET_NAME).remove([fileToDelete]);
  }

  revalidatePath('/admin/books');
  revalidatePath('/books');
}
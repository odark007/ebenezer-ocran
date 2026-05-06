'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'books';
const PUBLIC_BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`;

// ── AUTH HELPER ──────────────────────────────────────────────────────────────
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized.');
  return supabase;
}

// ── HELPER: Delete image from storage safely ─────────────────────────────────
async function deleteImageFromStorage(supabase: any, imageUrl: string | null) {
  if (!imageUrl || !imageUrl.startsWith(PUBLIC_BASE_URL)) return;
  const filePath = imageUrl.replace(PUBLIC_BASE_URL, '');
  await supabase.storage.from(BUCKET_NAME).remove([filePath]);
}

// ── BOOK ACTIONS ─────────────────────────────────────────────────────────────

export async function upsertBook(prevState: any, formData: FormData) {
  const supabase = await requireAuth();

  const id = (formData.get('id') as string) || uuidv4();
  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string) ||
    title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const amazon_url = formData.get('amazonUrl') as string;
  const blurb = (formData.get('blurb') as string) || null;
  const full_description = (formData.get('fullDescription') as string) || null;
  const topic_id = (formData.get('topicId') as string) || null;
  const badge = (formData.get('badge') as string) || null;
  const display_order = parseInt(formData.get('displayOrder') as string) || 0;
  const status = formData.get('status') as string;
  const is_featured = formData.get('isFeatured') === 'true';
  const old_image_url = (formData.get('oldImageUrl') as string) || null;
  const related_book_ids_raw = (formData.get('relatedBookIds') as string) || '[]';
  const related_book_ids = JSON.parse(related_book_ids_raw);

  const cover_file = formData.get('portrait') as File;
  let cover_image_url = old_image_url;
  let new_image_uploaded = false;

  // ── Upload new cover image if provided
  if (cover_file && cover_file.size > 0 && cover_file.name !== 'undefined') {
    const fileName = `covers/${id}/cover_${uuidv4()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, cover_file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw new Error(`Failed to upload cover: ${uploadError.message}`);

    cover_image_url = `${PUBLIC_BASE_URL}${fileName}`;
    new_image_uploaded = true;
  }

  // ── If setting as featured, unset all others first
  if (is_featured) {
    await supabase.from('books').update({ is_featured: false }).neq('id', id);
  }

  // ── Upsert book record
  const { error: upsertError } = await supabase.from('books').upsert({
    id, title, slug, amazon_url, blurb, full_description,
    topic_id, badge, display_order, status, is_featured,
    cover_image_url,
    related_book_ids,
    updated_at: new Date().toISOString(),
  });

  if (upsertError) {
    // Cleanup orphaned upload on DB failure
    if (new_image_uploaded) await deleteImageFromStorage(supabase, cover_image_url);
    throw new Error(`Failed to save book: ${upsertError.message}`);
  }

  // ── Cleanup old image if replaced
  if (new_image_uploaded && old_image_url) {
    await deleteImageFromStorage(supabase, old_image_url);
  }

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath(`/books/${slug}`);
  revalidatePath('/');
  redirect('/admin/books');
}

export async function deleteBook(id: string, image_url: string | null) {
  const supabase = await requireAuth();

  // Delete DB record first
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete book: ${error.message}`);

  // Then cleanup storage — no ghost files
  await deleteImageFromStorage(supabase, image_url);

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
}

export async function setFeaturedBook(id: string) {
  const supabase = await requireAuth();

  await supabase.from('books').update({ is_featured: false }).neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('books').update({ is_featured: true }).eq('id', id);
  if (error) throw new Error(`Failed to set featured: ${error.message}`);

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
}

// ── TOPIC ACTIONS ─────────────────────────────────────────────────────────────

export async function upsertTopic(prevState: any, formData: FormData) {
  const supabase = await requireAuth();

  const id = (formData.get('id') as string) || uuidv4();
  const name = formData.get('name') as string;
  const display_order = parseInt(formData.get('display_order') as string) || 0;

  const { error } = await supabase.from('book_topics').upsert({ id, name, display_order });
  if (error) throw new Error(`Failed to save topic: ${error.message}`);

  revalidatePath('/admin/books');
  revalidatePath('/books');
}

export async function deleteTopic(id: string) {
  const supabase = await requireAuth();

  const { error } = await supabase.from('book_topics').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete topic: ${error.message}`);

  revalidatePath('/admin/books');
  revalidatePath('/books');
}

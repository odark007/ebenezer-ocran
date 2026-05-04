'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'sermons';
const PUBLIC_BASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`;

// ── AUTH HELPER ──────────────────────────────────────────────────────────────
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized.');
  return supabase;
}

// ── SERMON ACTIONS ───────────────────────────────────────────────────────────

export async function upsertSermon(prevState: any, formData: FormData) {
  const supabase = await requireAuth();

  const id = (formData.get('id') as string) || uuidv4();
  const title = formData.get('title') as string;
  const type = formData.get('type') as string;
  const series_id = (formData.get('series_id') as string) || null;
  const youtube_url = formData.get('youtube_url') as string;
  const scripture_ref = (formData.get('scripture_ref') as string) || null;
  const description = (formData.get('description') as string) || null;
  const podbean_url = (formData.get('podbean_url') as string) || null;
  const status = formData.get('status') as string;
  const display_order = parseInt(formData.get('display_order') as string) || 0;
  const is_featured = formData.get('is_featured') === 'true';
  const old_notes_url = (formData.get('old_notes_url') as string) || null;
  const notes_file = formData.get('notes_file') as File;

  let notes_url = old_notes_url;

  // Upload notes PDF if provided
  if (notes_file && notes_file.size > 0 && notes_file.name !== 'undefined') {
    const fileName = `notes/${id}/notes_${uuidv4()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, notes_file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw new Error(`Failed to upload notes: ${uploadError.message}`);
    notes_url = `${PUBLIC_BASE_URL}${fileName}`;

    // Clean up old notes file if replaced
    if (old_notes_url) {
      const oldFile = old_notes_url.replace(PUBLIC_BASE_URL, '');
      await supabase.storage.from(BUCKET_NAME).remove([oldFile]);
    }
  }

  // If setting as featured, unset all others first
  if (is_featured) {
    await supabase.from('sermons').update({ is_featured: false }).neq('id', id);
  }

  const { error } = await supabase.from('sermons').upsert({
    id, title, type, series_id, youtube_url, scripture_ref,
    description, podbean_url, notes_url, status, display_order, is_featured,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(`Failed to save sermon: ${error.message}`);

  revalidatePath('/admin/sermons');
  revalidatePath('/sermons');
  revalidatePath('/');
  redirect('/admin/sermons');
}

export async function deleteSermon(id: string, notes_url: string | null) {
  const supabase = await requireAuth();

  const { error } = await supabase.from('sermons').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete sermon: ${error.message}`);

  // Clean up notes file from storage
  if (notes_url && notes_url.startsWith(PUBLIC_BASE_URL)) {
    const fileToDelete = notes_url.replace(PUBLIC_BASE_URL, '');
    await supabase.storage.from(BUCKET_NAME).remove([fileToDelete]);
  }

  revalidatePath('/admin/sermons');
  revalidatePath('/sermons');
  revalidatePath('/');
}

export async function setFeaturedSermon(id: string) {
  const supabase = await requireAuth();

  // Unset all, then set this one
  await supabase.from('sermons').update({ is_featured: false }).neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('sermons').update({ is_featured: true }).eq('id', id);
  if (error) throw new Error(`Failed to set featured: ${error.message}`);

  revalidatePath('/admin/sermons');
  revalidatePath('/');
}

// ── SERIES ACTIONS ───────────────────────────────────────────────────────────

export async function upsertSeries(prevState: any, formData: FormData) {
  const supabase = await requireAuth();

  const id = (formData.get('id') as string) || uuidv4();
  const name = formData.get('name') as string;
  const display_order = parseInt(formData.get('display_order') as string) || 0;

  const { error } = await supabase.from('sermon_series').upsert({ id, name, display_order });
  if (error) throw new Error(`Failed to save series: ${error.message}`);

  revalidatePath('/admin/sermons');
}

export async function deleteSeries(id: string) {
  const supabase = await requireAuth();

  const { error } = await supabase.from('sermon_series').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete series: ${error.message}`);

  revalidatePath('/admin/sermons');
}

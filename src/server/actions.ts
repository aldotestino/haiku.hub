'use server';

import { db } from './db';
import { haiku } from './db/model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';
import { authenticateUser } from './shared';

export async function createHaiku({ title, content }: {
  title: string;
  content: string;
}) {

  const userId = await authenticateUser();

  const newHaiku = await db.insert(haiku).values({
    title,
    content,
    userId
  }).returning({ id: haiku.id });

  revalidatePath('/dashboard');
  redirect(`/haiku/${newHaiku[0].id}`);
}

export async function updateHaiku({ id, title, content }: {
  id: number;
  title: string;
  content: string;
}) {

  const userId = await authenticateUser();

  await db.update(haiku).set({
    title,
    content
  }).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));

  revalidatePath('/dashboard');
}

export async function deleteHaiku({ id }: {
  id: number;
}) {

  const userId = await authenticateUser();

  await db.delete(haiku).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
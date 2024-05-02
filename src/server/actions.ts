'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from './db';
import { haiku } from './db/model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

export async function createHaiku({ title, content }: {
  title: string;
  content: string;
}) {

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

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

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  await db.update(haiku).set({
    title,
    content
  }).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));

  revalidatePath('/dashboard');
}

export async function deleteHaiku({ id }: {
  id: number;
}) {

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  await db.delete(haiku).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from './db';
import { haiku } from './db/model';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function getUserHaikus() {

  const { isAuthenticated, getUser } = getKindeServerSession();

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  return db.select({
    id: haiku.id,
    title: haiku.title,
    createdAt: haiku.createdAt
  }).from(haiku).where(eq(haiku.userId, userId));
}

export async function getHaiku(id: number) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  const haikus = await db.select({
    id: haiku.id,
    title: haiku.title,
    content: haiku.content
  }).from(haiku).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));
  if (haikus.length === 0)
    redirect('/dashboard');
  return haikus[0];
}
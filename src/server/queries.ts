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

  return db.select().from(haiku).where(eq(haiku.userId, userId));
}

export async function getHaiku(id: number) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  return db.select().from(haiku).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));
}
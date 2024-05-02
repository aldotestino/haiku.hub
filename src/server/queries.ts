'use server';

import { db } from './db';
import { haiku } from './db/model';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { authenticateUser } from './shared';

export async function getUserHaikus() {

  const userId = await authenticateUser();

  return db.select({
    id: haiku.id,
    title: haiku.title,
    createdAt: haiku.createdAt
  }).from(haiku).where(eq(haiku.userId, userId));
}

export async function getHaiku(id: number) {

  const userId = await authenticateUser();

  const haikus = await db.select({
    id: haiku.id,
    title: haiku.title,
    content: haiku.content
  }).from(haiku).where(and(eq(haiku.id, id), eq(haiku.userId, userId)));
  if (haikus.length === 0)
    redirect('/dashboard');
  return haikus[0];
}
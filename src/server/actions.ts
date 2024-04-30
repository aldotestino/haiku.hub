'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from './db';
import { haiku } from './db/model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

  await db.insert(haiku).values({
    title,
    content,
    userId
  });

  revalidatePath('/');
}
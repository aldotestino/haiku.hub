'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export async function authenticateUser() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }

  const userId = (await getUser())?.id;

  if (!userId) {
    redirect('/api/auth/login');
  }

  return userId;
}
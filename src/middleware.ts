import { withAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  await withAuth(req);
}

export const config = {
  matcher: ['/dashboard', '/haiku/[id]'],
};
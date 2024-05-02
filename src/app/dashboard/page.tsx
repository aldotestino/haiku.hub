import ActionWithTooltip from '@/components/action-with-tooltip';
import HaikusList from '@/components/haikus-list';
import LoadingHaikusList from '@/components/loading-haikus-list';
import Navbar from '@/components/navbar';
import { buttonVariants } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {  PenLine } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

async function Dashboard() {

  const { isAuthenticated, getUser } = getKindeServerSession(); 

  return (
    <div className="space-y-10">
      <Navbar isAuthenticated={await isAuthenticated()} user={await getUser()}>
        <ActionWithTooltip tooltip='New Haiku'>
          <Link href="/haiku/new" className={buttonVariants({ variant: 'outline' })}>
            <PenLine className="h-5 w-5" />
          </Link>
        </ActionWithTooltip>
      </Navbar>
      <main className="space-y-4">
        <h1 className="font-semibold text-3xl">My Haikus</h1>
        <Suspense fallback={<LoadingHaikusList />}>
          <HaikusList />
        </Suspense>
      </main>
    </div>
  );
}

export default Dashboard;
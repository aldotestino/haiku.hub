import ActionWithTooltip from '@/components/action-with-tooltip';
import Navbar from '@/components/navbar';
import { buttonVariants } from '@/components/ui/button';
import { getUserHaikus } from '@/server/queries';
import { Arrow } from '@radix-ui/react-tooltip';
import { ArrowLeft, PenLine } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

async function Dashboard() {

  const haikus = await getUserHaikus();

  return (
    <div className="space-y-10">
      <Navbar>
        <ActionWithTooltip tooltip='New Haiku'>
          <Link href="/haiku/new" className={buttonVariants({ variant: 'outline' })}>
            <PenLine className="h-5 w-5" />
          </Link>
        </ActionWithTooltip>
      </Navbar>
      <main className="space-y-4">
        <h1 className="font-semibold text-3xl">My Haikus</h1>
        <ul className='divide-y'>
          {haikus.map(haiku => (
            <li key={haiku.id}>
              <Link href={`/haiku/${haiku.id}`}>
                <div className="flex justify-between items-center hover:bg-slate-50 py-4 px-2">
                  <h2 className="text-2xl font-semibold font-serif">{haiku.title}</h2>
                  <p className="text-muted-foreground">{haiku.createdAt.toLocaleDateString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Dashboard;
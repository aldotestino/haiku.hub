import { getUserHaikus } from '@/server/queries';
import { Inbox } from 'lucide-react';
import Link from 'next/link';

async function HaikusList() {

  const haikus = await getUserHaikus();

  if(haikus.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        <Inbox size={64} />
        <h2 className="text-lg font-semibold">No haikus found</h2>
      </div>
    );
  }

  return (
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
  );
}

export default HaikusList;
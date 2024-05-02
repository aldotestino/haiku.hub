import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

async function navbar({ children }: {
  children?: React.ReactNode;
}) {

  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
      <Link href="/">
        <h1 className="font-semibold text-2xl">haiku.hub</h1>
      </Link>
      <div className='flex items-center gap-2'>
        {children}
      </div>
    </header>
  );
}

export default navbar;
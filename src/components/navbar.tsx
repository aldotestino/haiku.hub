import Link from 'next/link';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import NavbarAuth from './navbar-auth';

function navbar({ 
  children, 
  isAuthenticated, 
  user 
}: {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  user: KindeUser | null;  
}) {

  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
      <Link href="/">
        <h1 className="font-semibold text-2xl">haiku.hub</h1>
      </Link>
      <div className="flex items-center gap-2">
        {children}
        <NavbarAuth isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  );
}

export default navbar;
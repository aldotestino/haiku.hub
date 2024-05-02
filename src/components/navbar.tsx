'use client';

import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function navbar({ children, isAuthenticated, user }: {
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
        {(isAuthenticated && user) ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src={user.picture || undefined} />
                <AvatarFallback>{user.given_name![0]}{user.family_name![0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/haiku/new">New Haiku</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutLink>Sign Out</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginLink className={buttonVariants({ variant: 'outline' })}>Sign In</LoginLink>
        )}
      </div>
    </header>
  );
}

export default navbar;
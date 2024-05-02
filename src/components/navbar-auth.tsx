'use client';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { buttonVariants } from './ui/button';

function NavbarAuth({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: KindeUser | null;
}) {

  if(isAuthenticated && user) {
    return (
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
    );
  }
  
  return (
    <LoginLink className={buttonVariants({ variant: 'outline' })}>Sign In</LoginLink>
  );
}

export default NavbarAuth;
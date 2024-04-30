import ActionWithTooltip from '@/components/action-with-tooltip';
import Navbar from '@/components/navbar';
import { buttonVariants } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
  return (
    <div className="space-y-10">
      <Navbar>
        <ActionWithTooltip tooltip="New Haiku">
          <Link href="/haiku/new" className={buttonVariants({ variant: 'outline' })}>
            <PenLine className="w-5 h-5" />
          </Link>
        </ActionWithTooltip>
      </Navbar>
      <main>
        <LoginLink>Sign in</LoginLink>

        <RegisterLink>Sign up</RegisterLink>
      </main>
    </div>
  );
}

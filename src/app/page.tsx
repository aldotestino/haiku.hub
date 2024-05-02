import Navbar from '@/components/navbar';
import { buttonVariants } from '@/components/ui/button';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

async function Home() {

  const { isAuthenticated, getUser } = getKindeServerSession(); 

  const isAuth = await isAuthenticated();

  return (
    <div className="space-y-20">
      <Navbar isAuthenticated={isAuth} user={await getUser()}/>
      <main className="flex flex-col h-full justify-center items-center space-y-4">
        <h1 className="font-bold text-4xl text-center">
          Welcome to HaikuHub
        </h1>
        {isAuth ? 
          <div className="flex items-center gap-2">
            <Link href="/haiku/new" className={buttonVariants()}>
              Write new Haiku
            </Link>
            <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
              Go to Dashboard
            </Link>
          </div>
          : 
          <RegisterLink className={buttonVariants()}>
            Sign Up
          </RegisterLink> 
        }
      </main>
    </div>
  );
}

export default Home;
import Navbar from '@/components/navbar';
import { buttonVariants } from '@/components/ui/button';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
  return (
    <div className="space-y-20">
      <Navbar>
        <LoginLink className={buttonVariants({ variant: 'outline' })}>
          Sign In
        </LoginLink>
      </Navbar>
      <main className="flex flex-col h-full justify-center items-center space-y-4">
        <h1 className="font-bold text-4xl text-center">
          Welcome to HaikuHub
        </h1>
        <RegisterLink className={buttonVariants()}>
          Sign Up
        </RegisterLink>
      </main>
    </div>
  );
}

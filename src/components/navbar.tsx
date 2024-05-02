import Link from 'next/link';

function navbar({ children }: {
  children: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
      <Link href="/">
        <h1 className="font-semibold text-2xl">haiku.hub</h1>
      </Link>
      {children}
    </header>
  );
}

export default navbar;
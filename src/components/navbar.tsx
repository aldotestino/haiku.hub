import Link from 'next/link';

function navbar({ children }: {
  children: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <h1 className="font-semibold text-2xl">haiku.hub</h1>
      </Link>
      {children}
    </header>
  );
}

export default navbar;
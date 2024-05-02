import { Skeleton } from '@/components/ui/skeleton';

function LoadingHaikusList() {
  return (
    <ul className='divide-y'>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <Skeleton className="w-full h-[40px] rounded-none my-4" />
        </li>
      ))}
    </ul>

  );
}

export default LoadingHaikusList;
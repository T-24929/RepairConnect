import { Skeleton } from './ui/skeleton';

export function MechanicCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <Skeleton className="h-48 w-full" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
        </div>
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="h-[400px] sm:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
  );
}

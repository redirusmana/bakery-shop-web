import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full bg-gray-100">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="space-y-2 text-center">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-1/4 mx-auto mt-2" />
        <Skeleton className="h-8 w-full mt-4" />
      </div>
    </div>
  );
}
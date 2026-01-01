import { Skeleton } from "@/components/ui/skeleton";

export function ProductViewSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col">
        <Skeleton className="w-full h-[50vh] md:h-screen bg-gray-200 rounded-none" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col relative">
        <div className="flex-1 p-8 md:p-16 lg:px-24 lg:py-16 space-y-8">
          <Skeleton className="h-6 w-20 bg-gray-200 rounded-none" />

          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 w-3/4">
              <Skeleton className="h-8 w-full bg-gray-200 rounded-none" />
              <Skeleton className="h-8 w-1/2 bg-gray-200 rounded-none" />
            </div>
            <Skeleton className="h-8 w-24 bg-gray-200 rounded-none" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200 rounded-none" />
            <Skeleton className="h-4 w-full bg-gray-200 rounded-none" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 rounded-none" />
          </div>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-3">
            <Skeleton className="h-3 w-24 bg-gray-200 rounded-none" />
            <div className="flex gap-4">
              <Skeleton className="h-20 w-24 bg-gray-200 rounded-none" />
              <Skeleton className="h-20 w-24 bg-gray-200 rounded-none" />
              <Skeleton className="h-20 w-24 bg-gray-200 rounded-none" />
            </div>
          </div>

          <div className="h-px w-full border-t border-dashed border-gray-200" />

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-32 bg-gray-200 rounded-none" />
                <Skeleton className="h-5 w-5 bg-gray-200 rounded-none" />
              </div>
              <Skeleton className="h-12 w-full bg-gray-200 rounded-none" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-32 bg-gray-200 rounded-none" />
                <Skeleton className="h-5 w-5 bg-gray-200 rounded-none" />
              </div>
              <Skeleton className="h-20 w-full bg-gray-200 rounded-none" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 border-t border-gray-200  p-6 md:p-8">
          <div className="flex items-center justify-between gap-6">
            <Skeleton className="h-12 w-32 bg-gray-200 rounded-none" />
            <Skeleton className="h-12 flex-1 bg-gray-200 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

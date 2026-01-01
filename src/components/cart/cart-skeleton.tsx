import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  const SKELETON_ITEMS = [1, 2, 3];
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 scrollbar-hide">
        {SKELETON_ITEMS.map((item) => (
          <div key={item} className="flex gap-5">
            <Skeleton className="h-20 w-20 flex-shrink-0 bg-gray-200 rounded-none" />

            <div className="flex flex-1 flex-col justify-between py-1">
              <div className="space-y-2">
                <Skeleton className="h-3 w-3/4 bg-gray-200 rounded-none" />
                <Skeleton className="h-2 w-1/3 bg-gray-200 rounded-none" />
              </div>

              <div className="flex justify-between items-end mt-2">
                <Skeleton className="h-3 w-6 bg-gray-200 rounded-none" />{" "}
                <div className="flex gap-2">
                  <Skeleton className="h-2 w-8 bg-gray-200 rounded-none" />{" "}
                  <Skeleton className="h-2 w-10 bg-gray-200 rounded-none" />{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 px-8 py-6 pb-8 mt-auto">
        <div className="flex items-end justify-between mb-6">
          <Skeleton className="h-3 w-16 bg-gray-200 rounded-none" />{" "}
          <Skeleton className="h-6 w-24 bg-gray-200 rounded-none" />{" "}
        </div>

        <Skeleton className="h-14 w-full bg-gray-200 rounded-none" />
      </div>
    </div>
  );
}

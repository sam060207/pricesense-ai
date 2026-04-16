export function ProductCardSkeleton() {
  return (
    <div className="bg-card-bg border border-border rounded-xl overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-zinc-800 p-6"></div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/3 mb-4"></div>
          <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-1/2"></div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
          <div className="w-1/2">
            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"></div>
          </div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-32 pt-24 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-200 dark:bg-zinc-800 rounded-3xl h-[500px]"></div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-1/2"></div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-full w-20"></div>
            <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
          </div>
          <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

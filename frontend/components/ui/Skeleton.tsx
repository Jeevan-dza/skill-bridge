interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200/60 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <Skeleton className="w-20 h-3 rounded mb-2" />
      <Skeleton className="w-14 h-7 rounded" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[280px]">
      <Skeleton className="w-40 h-40 rounded-full mb-4" />
      <Skeleton className="w-32 h-3 rounded" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-6 py-4"><Skeleton className="w-28 h-4 rounded" /></td>
      <td className="px-6 py-4"><Skeleton className="w-full h-1.5 rounded-full" /></td>
      <td className="px-6 py-4 text-right"><Skeleton className="w-16 h-5 rounded-full ml-auto" /></td>
    </tr>
  );
}

export function ModuleSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5">
      <div className="h-1.5 md:h-auto md:w-1.5 bg-slate-200 shrink-0 rounded" />
      <div className="flex-1 space-y-3">
        <Skeleton className="w-20 h-3 rounded" />
        <Skeleton className="w-48 h-5 rounded" />
        <Skeleton className="w-full h-3 rounded" />
        <Skeleton className="w-full h-1.5 rounded-full" />
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function GiftListSkeleton() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Lista de Regalos</h2>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-3"
        >
          <div className="flex-1 min-w-0">
            <Skeleton
              className="h-5 rounded-md"
              style={{ width: ["65%", "80%", "70%", "55%", "75%"][i] }}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="h-5 w-5 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

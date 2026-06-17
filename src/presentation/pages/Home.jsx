import { useState, lazy, Suspense } from "react";
import { GiftInput } from "@/presentation/components/GiftInput";
import { GiftListSkeleton } from "@/presentation/components/GiftListSkeleton";
import { DeleteConfirmModal } from "@/presentation/components/DeleteConfirmModal";

const GiftList = lazy(() =>
  import("@/presentation/components/GiftList").then((m) => ({ default: m.GiftList }))
);
import { Toast } from "@/presentation/components/Toast";
import { useGifts, useCreateGift, useDeleteGift, useUpdateGift } from "@/presentation/hooks/useGifts";
import { useRegisterUser } from "@/presentation/hooks/useRegisterUser";
import { User, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function Home() {
  const currentUserId = useRegisterUser();
  const { data: gifts = [], isLoading } = useGifts();
  const createGift = useCreateGift();
  const deleteGift = useDeleteGift();
  const updateGift = useUpdateGift();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAdd = (name) => {
    createGift.mutate(name, {
      onSuccess: () => setToast({ key: Date.now(), message: `"${name}" añadido`, variant: "success" }),
    });
  };

  const handleEdit = (id, name) => {
    updateGift.mutate({ id, name }, {
      onSuccess: () => setToast({ key: Date.now(), message: `"${name}" actualizado`, variant: "success" }),
    });
  };

  const handleDeleteRequest = (id) => {
    const gift = gifts.find((g) => g.id === id);
    if (gift) setDeleteTarget(gift);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const name = deleteTarget.name;
      deleteGift.mutate(deleteTarget.id, {
        onSuccess: () => setToast({ key: Date.now(), message: `"${name}" eliminado`, variant: "error" }),
      });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8edea]/30 via-[#fed6e3]/20 to-white">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 text-4xl opacity-60"></div>
        <div className="absolute top-20 right-20 text-2xl opacity-40">✨</div>
        <div className="absolute top-40 right-8 text-3xl opacity-50">⭐</div>
        <div className="absolute bottom-20 left-8 text-4xl opacity-50">🎁</div>
        <div className="absolute bottom-40 right-12 text-3xl opacity-40">🎈</div>
        <div className="absolute bottom-10 right-20 text-4xl opacity-60"></div>
        <div className="absolute top-60 left-6 text-3xl opacity-40">🎁</div>
        <div className="absolute top-80 left-12 text-2xl opacity-30">✨</div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">Cumpleaños de Sofía</h1>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </header>

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#a8edea] to-[#fed6e3] rounded-2xl p-6 mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            🎉 Regalos de Cumpleaños para Sofía 🎉
          </h2>
        </div>

        <Alert className="mb-6">
          <Info />
          <AlertTitle>Regalo opcional</AlertTitle>
          <AlertDescription>
            El regalo es totalmente opcional. Hemos creado esta app en pro de no repetir regalos.
          </AlertDescription>
        </Alert>

        <Alert className="mb-6">
          <Info />
          <AlertTitle>Open Graph</AlertTitle>
          <AlertDescription>
            og:title: ¡Estás invitado a la celebración de mi primer añito! | og:description: Fecha: 04/07 - Hora: 2:00 PM - Lugar: Cra 50 #165-50 - Rincon del karmel 1 | og:image: /invitacion-og.jpeg | og:type: website
          </AlertDescription>
        </Alert>

        {/* Sticky Input */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-md border border-gray-100">
          <GiftInput onAdd={handleAdd} disabled={createGift.isPending} />
        </div>

        {/* Gift List */}
        <div className="pb-20">
          {isLoading ? (
            <GiftListSkeleton />
          ) : gifts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No hay regalos aún. ¡Sé el primero en añadir uno!
            </div>
          ) : (
            <Suspense fallback={<GiftListSkeleton />}>
              <GiftList
                gifts={gifts ?? []}
                currentUserId={currentUserId}
                onDelete={handleDeleteRequest}
                onEdit={handleEdit}
              />
            </Suspense>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={!!deleteTarget}
        giftName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          variant={toast.variant}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

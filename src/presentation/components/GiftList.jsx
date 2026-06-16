import { GiftItem } from "./GiftItem";

export function GiftList({ gifts, currentUserId, onDelete, onEdit }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Lista de Regalos</h2>
      {(gifts).map((gift) => (
        <GiftItem
          key={gift.id}
          gift={gift}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

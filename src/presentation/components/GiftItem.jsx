import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { YA_COMPRADO } from "@/domain/constants/labels";

export function GiftItem({ gift, currentUserId, onDelete }) {
  const isOwner = gift.createdBy === currentUserId;
  const isTaken = gift.status === "taken";

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-gray-800 truncate">{gift.name}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isTaken && (
          <Badge
            variant="secondary"
            className="bg-[#dbeafe] text-[#1e40af] hover:bg-[#dbeafe] text-sm px-3 py-1 rounded-full"
          >
            {YA_COMPRADO}
          </Badge>
        )}
        {isOwner && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(gift.id)}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

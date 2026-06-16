import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { YA_COMPRADO } from "@/domain/constants/labels";

export function GiftItem({ gift, currentUserId, onDelete, onEdit }) {
  const isOwner = gift.createdBy === currentUserId;
  const isTaken = gift.status === "taken";
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(gift.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const handleSave = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== gift.name) {
      onEdit(gift.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-base font-medium text-gray-800 outline-none focus:border-[#2a9d8f] focus:ring-1 focus:ring-[#2a9d8f]"
          />
        ) : (
          <p className="text-base font-medium text-gray-800 truncate">{gift.name}</p>
        )}
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
        {isOwner && !editing && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditName(gift.name);
                setEditing(true);
              }}
              className="text-teal-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
            >
              <Pencil className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(gift.id)}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

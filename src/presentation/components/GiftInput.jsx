import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function GiftInput({ onAdd, disabled }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Añadir nuevo regalo (ej. Bicicleta)..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
        className="flex-1 rounded-full px-4 py-6 text-base border-gray-200 shadow-sm"
      />
      <Button
        type="submit"
        disabled={disabled || !name.trim()}
        className="rounded-full px-6 py-6 bg-[#2a9d8f] hover:bg-[#238276] text-white font-semibold shadow-sm"
      >
        <Plus className="w-5 h-5 mr-1" />
        Añadir
      </Button>
    </form>
  );
}

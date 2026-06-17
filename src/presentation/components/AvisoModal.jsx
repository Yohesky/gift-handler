import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AvisoModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose} dismissible={false}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Aviso</DialogTitle>
          <DialogDescription>
            Ingresa el regalo que tú le quieras dar a Sofi. Los regalos que verás
            ya listados son los que ya otras personas agregaron.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

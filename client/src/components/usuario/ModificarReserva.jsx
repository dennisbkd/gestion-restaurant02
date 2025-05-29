import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, Clock, Utensils, X, Trash2, Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eliminarReserva } from "@/api/cliente/reserva";
import { ReservaContext } from "@/context/Reserva/ReservaContext";


export function ModificarReserva({ reserva, idClienteWeb, nroMesa }) {
  const navigate = useNavigate();
  const { mesasDisponibles, mostrarMesasDisponibles, EditarReserva, refrescarDatos } = useContext(ReservaContext);
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("editar");
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    id: reserva.id || 0,
    idClienteWeb: idClienteWeb,
    idMesa: 0, // Asignar la primera mesa por defecto
    idEstado: 10,
  });

  useEffect(() => {
    if (formData.fecha && formData.hora) {
      mostrarMesasDisponibles(formData.fecha, formData.hora);
    }
  }, [formData.fecha, formData.hora]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (value) => {
    setFormData(prev => ({ ...prev, idMesa: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí iría tu llamada a la API para actualizar
      EditarReserva(formData);
      toast.success("¡Reserva confirmada!", {
        description: `Tu mesa ha sido reservada para el ${formData.fecha} a las ${formData.hora}.`,
      })
      refrescarDatos();
      navigate("/perfil");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Aquí iría tu llamada a la API para eliminar
      await eliminarReserva(reserva.id, formData.idMesa);
      toast.success("¡Reserva eliminada!", {
        description: `Tu reserva para la mesa ${nroMesa} ha sido eliminada.`,
      });
      setIsOpen(false);
      refrescarDatos();
      navigate("/perfil");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/perfil");
  };


  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="ml-7 px-9 relative hover:cursor-pointer bg-purple-500 text-white"
        onClick={() => (setIsOpen(true), setAction("editar"))}
      >
        <span>Editar</span>
        <Pencil className="h-4 w-4" />

      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="ml-7 px-11 relative hover:cursor-pointer"
        onClick={() => (setIsOpen(true), setAction("eliminar"))}
      >
        <span>Eliminar</span>
        <Trash2 className="h-4 w-4" />

      </Button>
      <Toaster richColors position="top-center" />
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby="reservation-dialog-description"
          aria-labelledby="dialog-title"
        >
          <DialogHeader>
            <DialogTitle id="dialog-title" className="flex items-center gap-2">
              {action === "editar" ? (
                <>
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                  Editar Reserva #{reserva.id}
                </>
              ) : (
                <>
                  <Trash2 className="h-5 w-5 text-red-500" aria-hidden="true" />
                  Eliminar Reserva #{reserva.id}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {action === "editar"
                ? "Formulario para modificar los detalles de la reserva"
                : "Confirmación para eliminar la reserva permanentemente"}
            </DialogDescription>
          </DialogHeader>

          {action === "editar" ? (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fecha" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha
                </Label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full"
                />
                {formData.fecha && (
                  <p className="text-sm text-muted-foreground">
                    {formData.fecha}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hora" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora
                </Label>
                <Input
                  id="hora"
                  name="hora"
                  type="time"
                  value={formData.hora}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idMesa" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" aria-hidden="true" />
                  <span>Número de Mesa</span>
                </Label>
                <Select
                  value={formData.idMesa.toString()}
                  onValueChange={handleTableChange}
                >
                  <SelectTrigger className="w-full" aria-label="Seleccionar número de mesa">
                    <SelectValue
                      placeholder="Selecciona una mesa"
                      aria-label={formData.idMesa ? `Mesa ${formData.idMesa}` : "Selecciona una mesa"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {mesasDisponibles.map(mesa => (
                      <SelectItem
                        key={mesa.id}
                        value={mesa.nro.toString()}
                        aria-label={`Mesa ${mesa.nro}`}
                      >
                        Mesa {mesa.nro}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button type="submit">
                  <Check className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  ¿Estás seguro que deseas eliminar esta reserva?
                </p>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">
                    Reserva #{reserva.id} - Mesa {nroMesa.nro}
                  </p>
                  <p className="text-sm">
                    {reserva.fecha} a las {reserva.hora}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar Reserva
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
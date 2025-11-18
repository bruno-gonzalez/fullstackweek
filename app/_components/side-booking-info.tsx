import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Prisma, Service, Booking } from "@prisma/client";
import { BookingItemProps } from "../_types/bookingItemProps";
import ReviewDialog from "../bookings/_components/review-dialog";

const BookingSideInfo = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = (booking: Booking) => {
    return isFuture(booking.date);
  };

  return (
    <>
      <SheetContent className="px-0 gap-0 max-w-full">
        <SheetHeader className="text-left px-5 py-5 border-b border-solid border-secondary">
          <SheetTitle>Detalhes do agendamento</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full mt-7">
          <Image
            src={"/barbershop-map.png"}
            alt={"Mapa da barbearia"}
            fill
            style={{ objectFit: "contain" }}
          />
          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card className="p-3">
              <CardContent className="flex gap-2 items-center justify-start px-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>
                    {booking.barbershop.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-sm">
                    {booking.barbershop.name}
                  </h2>
                  <p className="text-xs text-gray-500 overflow-hidden text-ellipsis text-nowrap">
                    {booking.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="py-3 px-3 space-y-4">
          <div className="flex justify-between items-center">
            <Badge
              variant={isBookingConfirmed(booking) ? "default" : "secondary"}
            >
              {isBookingConfirmed(booking) ? "Confirmado" : "Finalizado"}
            </Badge>
            {!isBookingConfirmed(booking) && (
              <ReviewDialog
                barbershopId={booking.barbershop.id}
                barbershopName={booking.barbershop.name}
              />
            )}
          </div>

          <Card>
            <CardContent className="flex flex-col gap-3 px-3 border-solid border-secondary">
              <div className="flex justify-between">
                <p className="font-bold text-lg">{booking.service.name}</p>
                <p className="font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500 text-sm">Data</p>
                <p className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500 text-sm">Horário</p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500 text-sm">Barbearia</p>
                <p className="text-sm">{booking.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row p-0 px-3 gap-3 mt-0 max-w-full">
          <SheetClose asChild>
            <Button variant="secondary" className="flex-1">
              Voltar
            </Button>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={isBookingConfirmed(booking) ? false : true}
                className="flex-1"
              >
                Cancelar
              </Button>
            </AlertDialogTrigger>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </>
  );
};

export default BookingSideInfo;

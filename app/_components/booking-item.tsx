"use client";

import { Barbershop, Booking, Prisma, Service } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Omit<
    Prisma.BookingGetPayload<{
      include: {
        service: true;
        barbershop: true;
      };
    }>,
    "service"
  > & {
    service: Omit<Service, "price"> & { price: number };
  };
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = (booking: Booking) => {
    return isFuture(booking.date);
  };

  const [isCanceling, setIsCanceling] = useState(false);

  const handleCancelBooking = async () => {
    try {
      setIsCanceling(true);

      await cancelBooking(booking.id);
      toast.success("Agendamento cancelado com sucesso!");
    } catch (error) {
      console.error("O cancelamento falhou", error);
      toast.error("Falha ao cancelar o agendamento.");
    }
    finally {
      setIsCanceling(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="py-0 min-w-full">
          <CardContent className="flex px-0">
            <div className="flex flex-col gap-2 py-5 flex-[4] px-3">
              <Badge
                className={
                  isBookingConfirmed(booking)
                    ? "bg-[#221c30] text-primary"
                    : "bg-gray-600 text-secondary"
                }
              >
                {isBookingConfirmed(booking) ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>
                    {booking.barbershop.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-3 items-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
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
          <Badge
            variant={isBookingConfirmed(booking) ? "default" : "secondary"}
          >
            {isBookingConfirmed(booking) ? "Confirmado" : "Finalizado"}
          </Badge>
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
          <Button
            variant={"destructive"}
            disabled={isBookingConfirmed(booking) ? false : true}
            className="flex-1"
            onClick={handleCancelBooking}
          >
            {isCanceling ? <Loader2 className="mr-2 h-4 w-4" /> : "Cancelar agendamento"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;

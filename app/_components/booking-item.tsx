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
import BookingSideInfo from "./side-booking-info";
import { BookingItemProps } from "../_types/bookingItemProps";

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = (booking: Booking) => {
    return isFuture(booking.date);
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
      <BookingSideInfo booking={booking} />
    </Sheet>
  );
};

export default BookingItem;

"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { signIn } from "next-auth/react";
import { Service } from "@prisma/client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";

interface ServiceItemProps {
  service: Omit<Service, "price"> & { price: number };
  isAuthenticated?: boolean;
}


const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn("google");
    }
    //todo modal agendamento
  };

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <Card className="m-0 py-2 px-0">
      <CardContent className="px-1">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold ">{service.name}</h2>
            <p className="text-gray-500 text-sm">{service.description}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="font-bold text-primary text-ls">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(service.price)}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="px-0 gap-0">
                  <SheetHeader className="text-left px-5 py-5 border-b border-solid border-secondary">
                    <SheetTitle>Agendar {service.name}</SheetTitle>
                  </SheetHeader>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={month}
                    onMonthChange={setMonth}
                    className="w-full mt-6"
                    buttonVariant={"ghost"}
                    locale={ptBR}
                    disabled={{ before: new Date() }}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%"
                      },
                      day_button: {
                        width: "100%"
                      },
                      nav_button: {
                        marginLeft: 0,
                        marginRight: 0,
                      },
                      caption_label: {
                        textTransform: "capitalize",
                      }
                    }}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;

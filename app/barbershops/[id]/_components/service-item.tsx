"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format, set, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-bookin";import { Spinner } from "@/app/_components/ui/spinner";
;

interface ServiceItemProps {
  service: Omit<Service, "price"> & { price: number };
  isAuthenticated?: boolean;
  barbershop: Barbershop;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const {data} = useSession();

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn("google");
    }
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleBookingSubmit = async() => {
    setSubmitIsLoading(true);
    try {
      if (!date || !hour || !data?.user.id) {
        return;
      }

      const newDate = setMinutes(setHours(date, Number(hour.split(":")[0])), Number(hour.split(":")[1]));


      await saveBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        userId: data?.user.id,
        date: newDate
      });
    }
    catch (error) {
     console.log(error); 
    }
    finally {
      setSubmitIsLoading(false);
    }
  };
  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

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
                    onSelect={handleDateClick}
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
                        width: "100%",
                      },
                      day_button: {
                        width: "100%",
                      },
                      nav_button: {
                        marginLeft: 0,
                        marginRight: 0,
                      },
                      caption_label: {
                        textTransform: "capitalize",
                      },
                    }}
                  />

                  {/*mostrar lista de horários apenas após a seleção da data*/}
                  {date && (
                    <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 py-6 border-y border-solid border-secondary">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* preview do serviço + valor + data + horário selecionados */}
                  {date && hour && (
                    <div className="py-6 px-3">
                      <Card>
                        <CardContent className="flex flex-col gap-3 px-3 border-solid border-secondary">
                          <div className="flex justify-between">
                            <p className="font-bold text-lg">{service.name}</p>
                            <p className="font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(service.price)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-zinc-500 text-sm">Data</p>
                            <p className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-zinc-500 text-sm">Horário</p>
                            <p className="text-sm">{hour}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-zinc-500 text-sm">Barbearia</p>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {date && hour && (
                    <SheetFooter className="m-0 py-0 px-3">
                      <Button onClick={handleBookingSubmit} disabled={submitIsLoading}>
                        {submitIsLoading ? <Spinner /> : "Confirmar Reserva"}
                      </Button>
                    </SheetFooter>
                  )}
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

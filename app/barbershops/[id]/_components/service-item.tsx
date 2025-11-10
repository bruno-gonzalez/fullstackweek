'use client'

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { signIn } from "next-auth/react";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
  service: Omit<Service, "price"> & { price: number };
  isAuthenticated?: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if(!isAuthenticated) {
      signIn('google');
      
    }
    //todo modal agendamento
  };

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
                <p className="font-bold text-primary text-ls">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(service.price)}</p>
                <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;

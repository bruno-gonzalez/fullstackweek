'use client';

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl py-0">
      <CardContent className="p-0">
        <div className="w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant={'secondary'} className="flex items-center justify-center opacity-90">
            <StarIcon className="fill-primary text-primary" size={12}/>
            <span>5,0</span>
          </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[159px] w-full rounded-2xl"
          />
        </div>

        <div className="px-2 pb-2">
          <h2 className="font-bold mt-2 text-sm">{barbershop.name}</h2>
          <p className="text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button className="w-full mt-3" variant={"secondary"} onClick={handleBookingClick}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;

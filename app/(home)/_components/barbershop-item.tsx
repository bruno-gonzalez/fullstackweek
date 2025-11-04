import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl py-0">
            <CardContent className="p-0">
            <div className="px-1">
                <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-[159px] w-full rounded-2xl"
                />
                <h2 className="font-bold mt-2 text-sm">{barbershop.name}</h2>
                <p className="text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                {barbershop.address}
                </p>
                    <Button className="w-full mt-3" variant={"secondary"}>
                    Reservar
                    </Button>
            </div>
        </CardContent>
    </Card>
  );
};

export default BarbershopItem;

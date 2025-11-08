import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarberShopInfo from "./_components/barber-shop-info";

interface BarbershopPageProps {
    params: Promise<{ id?: string }>;
}

const BarbershopPage = async ({params}: BarbershopPageProps) => {
    const { id } = await params;

    if(!id) {
        //TODO
        return <h1>Barbearia não encontrada</h1>
    }
    
    const barbershop = await db.barbershop.findUnique({
        where: { 
            id,
        },
    });

    if(!barbershop) {
        //TODO
        return <h1>Barbearia não encontrada</h1>
    }




    return (
        <BarberShopInfo barbershop={barbershop} />
      );
}
 
export default BarbershopPage;
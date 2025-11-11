import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale/pt-BR";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { auth } from "@/auth";


export default async function Home() {
  const barbershops = await db.barbershop.findMany();

  const session = await auth();

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, {session?.user?.name || "Fulano"}</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6 mb-6">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="text-xs mb-3 uppercase text-gray-400">Agendamentos</h2>
        <BookingItem />
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Barbearias
        </h2>

        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden px-5 pb-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden px-5 pb-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}

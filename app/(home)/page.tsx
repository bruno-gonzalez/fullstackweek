import { format, isFuture } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale/pt-BR";
import Search from "@/app/_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { auth } from "@/auth";
import { Review } from "@prisma/client";

export default async function Home() {
  const session = await auth();

  const [barbershops, randomBarbershops, myBookings] = await Promise.all([
    db.barbershop.findMany({
      include: {
        reviews: true,
      }
    }),
    db.barbershop.findMany({
      include: {  
        reviews: true,
      },
      take: 10,
      orderBy: {
        id: 'asc',
      }
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: session?.user?.id,
          },
          include: {
            barbershop: true,
            service: true
          },
          orderBy: {
            date: "asc",
          },
        })
      : Promise.resolve([]),
    
  ]);

  const getReviewStats = (reviews: Review[]) => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return {
      averageRating: total / reviews.length,
      totalReviews: reviews.length,
    };
  }

  // Convert Decimal to number for Client Components
  const bookingsWithPrices = myBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }));

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user?.name || "Fulano"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6 mb-6">
        <Search />
      </div>

      <div className="px-5">
        {bookingsWithPrices.filter((booking) => isFuture(booking.date)).length >
          0 && (
          <>
            <h2 className="text-xs mb-3 uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
              {bookingsWithPrices
                .filter((booking) => isFuture(booking.date))
                .map((confirmedBooking) => (
                  <BookingItem
                    key={confirmedBooking.id}
                    booking={confirmedBooking}
                  />
                ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Barbearias
        </h2>

        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden px-5 pb-5">
          {barbershops.map((barbershop) => (
            <div className="min-w-[167px]" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} reviewStats={getReviewStats(barbershop.reviews)} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden px-5 pb-5">
          {randomBarbershops.map((barbershop) => (
            <div className="min-w-[167px]" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} reviewStats={getReviewStats(barbershop.reviews)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barber-shop-info";
import ServiceItem from "./_components/service-item";
import { auth } from "@/auth";

interface BarbershopPageProps {
  params: Promise<{ id?: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const session = await auth();
  const { id } = await params;

  if (!id) {
    //TODO
    return <h1>Barbearia não encontrada</h1>;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    //TODO
    return <h1>Barbearia não encontrada</h1>;
  }

  // Convert Decimal to number for Client Components
  const barbershopWithPrices = {
    ...barbershop,
    services: barbershop.services.map(service => ({
      ...service,
      price: Number(service.price),
    })),
  };

  return (
    <div>
      <BarberShopInfo barbershop={barbershopWithPrices} />

      <div className="px-5 flex flex-col gap-4 mb-10 py-6">
        {barbershopWithPrices.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session}
            barbershop={barbershopWithPrices}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;

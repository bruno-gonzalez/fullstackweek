import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../_components/search";
import { Review } from "@prisma/client";


interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {


  const search = await searchParams;

  if (!search.search) {
    redirect("/");
  }

  const barbershopSearch = await db.barbershop.findMany({
    where: {
      name: {
        contains: search.search,
        mode: "insensitive",
      },
    },
    include: {
      reviews: true,
    },
  });

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
  };

  return (
    <>
      <Header />
      
      <div className="px-5 py-6 flex flex-col gap-4">
        <Search />

        <span className="text-sm text-gray-500">
          Resultados para "{search.search}"
        </span>

        {barbershopSearch.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {barbershopSearch.map((barbershop) => (
              <div key={barbershop.id} className="w-full">
                <BarbershopItem 
                  barbershop={barbershop} 
                  reviewStats={getReviewStats(barbershop.reviews)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhuma barbearia encontrada.</p>
        )}
      </div>
    </>
  );
};

export default BarbershopsPage;

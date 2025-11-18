import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barber-shop-info";
import ServiceItem from "./_components/service-item";
import { auth } from "@/auth";
import ReviewItem from "./_components/review-item";
import Rating from "@/app/_components/ui/rating";
import { Star } from "lucide-react";
import { Review } from "@prisma/client";

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

  const barbershop = await
    db.barbershop.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
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

  const reviewStats = getReviewStats(barbershop.reviews);

  return (
    <div>
      <BarberShopInfo barbershop={barbershopWithPrices} reviewStats={reviewStats} />
      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershopWithPrices.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session}
            barbershop={barbershopWithPrices}
          />
        ))}
      </div>

      <div className="px-5 py-6 border-t border-solid border-secondary">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Avaliações</h2>
            {reviewStats.totalReviews > 0 && (
              <div className="flex items-center gap-2">
                <Rating value={Math.round(reviewStats.averageRating)} readonly size="sm" />
                <span className="text-sm text-gray-400">
                  {reviewStats.averageRating.toFixed(1)} ({reviewStats.totalReviews}{" "}
                  {reviewStats.totalReviews === 1 ? "avaliação" : "avaliações"})
                </span>
              </div>
            )}
          </div>
        </div>

        {barbershop.reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Ainda não há avaliações para esta barbearia</p>
            {session?.user && (
              <p className="text-sm mt-1">Seja o primeiro a avaliar!</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {barbershop.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BarbershopPage;

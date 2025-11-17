"use client";

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopInfoProps {
  barbershop: {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
  };
  reviewStats: {
    averageRating: number;
    totalReviews: number;
  };
}

const BarberShopInfo = ({ barbershop, reviewStats }: BarberShopInfoProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.replace("/");
  };
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          onClick={handleBackClick}
          variant={"outline"}
          className="absolute bg-gray-900 z-50 top-3 left-3"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant={"outline"}
              className="absolute bg-gray-900 z-50 top-3 right-3"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover rounded-tl-2xl rounded-tr-2xl opacity-75"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex gap-4">
          <div className="flex item-center gap-1 mt-2">
          <MapPin size={16} className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        {reviewStats.totalReviews > 0 && (
          <div className="flex item-center gap-1 mt-2">
            <StarIcon size={16} className="text-primary fill-primary" />
            <p className="text-sm">
              {reviewStats.averageRating.toFixed(1)} ({reviewStats.totalReviews}{" "}
              {reviewStats.totalReviews === 1 ? "avaliação" : "avaliações"})
            </p>
          </div>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default BarberShopInfo;

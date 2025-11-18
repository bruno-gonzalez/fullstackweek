import { Prisma, Service } from "@prisma/client";

interface BookingItemProps {
  booking: Omit<
    Prisma.BookingGetPayload<{
      include: {
        service: true;
        barbershop: true;
      };
    }>,
    "service"
  > & {
    service: Omit<Service, "price"> & { price: number };
  };
}

export type { BookingItemProps };
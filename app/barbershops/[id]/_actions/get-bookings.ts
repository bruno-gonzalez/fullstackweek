"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getDayBookings = async (data: Date, barbershopId: string) => {
    const bookings = await db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(data),
                gte: startOfDay(data),
            },
            barbershopId: barbershopId,
        },
    })

    return bookings;
}
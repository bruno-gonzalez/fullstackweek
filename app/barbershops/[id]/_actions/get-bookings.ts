"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getDayBookings = async (data: Date) => {
    const bookings = await db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(data),
                gte: startOfDay(data),
            }
        },
    })

    return bookings;
}
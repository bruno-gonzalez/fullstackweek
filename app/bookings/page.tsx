import { auth } from "@/auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return (
           redirect('/')
        );
    }


    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
        where: { 
            userId: session.user.id,
            date: {
                gte: new Date(),
            }
        },
        include: {
            barbershop: true,
            service: true,
        }
    }),
        db.booking.findMany({
            where: { 
                userId: session.user.id,
                date: {
                    lt: new Date(),
                }
            },
            include: {
                barbershop: true,
                service: true,
            }
        })
    ]) 

    // const confirmedBookings = myBookings.filter(booking => booking.date >= new Date());
    // const finishedBookings = myBookings.filter(booking => booking.date < new Date());

    return ( 
        <>
            <Header />
            <div className="px-5 py-6 flex flex-col min-h-full">
                <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

                {confirmedBookings.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-gray-400 uppercase text-xs font-bold mb-3">
                            Confirmados
                        </h2>
                        <div className="flex flex-col gap-3">
                            {confirmedBookings.map(booking => (
                                <BookingItem 
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {finishedBookings.length > 0 && (
                    <div>
                        <h2 className="text-gray-400 uppercase text-xs font-bold mb-3">
                            Finalizados
                        </h2>
                        <div className="flex flex-col gap-3">
                            {finishedBookings.map(booking => (
                                <BookingItem 
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {finishedBookings.length === 0 && confirmedBookings.length === 0 && (
                    <p className="text-gray-400">Você ainda não tem agendamentos.</p>
                )}
            </div>
        </>
    );
}
 
export default BookingsPage;
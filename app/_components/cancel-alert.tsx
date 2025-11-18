import { Booking } from "@prisma/client";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { BookingItemProps } from "../_types/bookingItemProps";
import { useState } from "react";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CancelAlert = ({booking} : BookingItemProps) => {

    const [isCanceling, setIsCanceling] = useState(false);
    const handleCancelBooking = async () => {
        try {
        setIsCanceling(true);

        await cancelBooking(booking.id);
        toast.success("Agendamento cancelado com sucesso!");
        } catch (error) {
        console.error("O cancelamento falhou", error);
        toast.error("Falha ao cancelar o agendamento.");
        } finally {
        setIsCanceling(false);
        }
    };

    return ( 
        <>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja cancelar o agendamento?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso cancelará
                  permanentemente o agendamento.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row justify-center">
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isCanceling}
                  className="bg-red-500"
                  onClick={handleCancelBooking}
                >
                  {isCanceling ? (
                    <Loader2 className="mr-2 h-4 w-4" />
                  ) : (
                    "Confirmar"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </>
     );
}
 
export default CancelAlert;
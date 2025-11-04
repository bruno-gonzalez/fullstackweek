import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return ( 
        <Card className="py-0">
            <CardContent className="flex justify-between">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221c30] text-primary">Confirmado</Badge>
                    <h2 className="font-bold">Corte de Cabelo</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
                            <AvatarFallback>VB</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">Vintage barber</h3>
                    </div>
                </div>

                <div className="flex flex-col justify-center px-3 items-center border-l border-solid border-secondary">
                    <p className="text-sm">Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p className="text-sm">09:45</p>
                </div>
            </CardContent>
        </Card>


     );
}
 
export default BookingItem;
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Card, CardContent } from "@/app/_components/ui/card";
import Rating from "@/app/_components/ui/rating";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReviewItemProps {
  review: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.user.image || ""} alt={review.user.name || ""} />
            <AvatarFallback>
              {review.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{review.user.name || "Usuário"}</p>
                <p className="text-xs text-gray-500">
                  {format(review.createdAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
              <Rating value={review.rating} readonly size="sm" />
            </div>

            {review.comment && (
              <p className="text-sm text-gray-400">{review.comment}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;

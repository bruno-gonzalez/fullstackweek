"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import Rating from "@/app/_components/ui/rating";
import { Spinner } from "@/app/_components/ui/spinner";
import { toast } from "sonner";
import { saveReview } from "../../barbershops/[id]/_actions/save-review";
import { Star } from "lucide-react";

interface ReviewDialogProps {
  barbershopId: string;
  barbershopName: string;
}

const ReviewDialog = ({ barbershopId, barbershopName }: ReviewDialogProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação");
      return;
    }

    setIsLoading(true);
    try {
      await saveReview({
        rating,
        comment: comment.trim() || undefined,
        barbershopId,
      });

      toast.success("Avaliação enviada com sucesso!");
      setOpen(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar avaliação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Star className="w-4 h-4" />
          Avaliar Barbearia
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Avaliar {barbershopName}</AlertDialogTitle>
          <AlertDialogDescription>
            Compartilhe sua experiência com outros usuários
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sua avaliação</label>
            <div className="flex justify-center">
              <Rating value={rating} onChange={setRating} size="lg" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comentário (opcional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre sua experiência..."
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {comment.length}/500
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>
          <Button onClick={handleSubmit} disabled={isLoading || rating === 0}>
            {isLoading ? <Spinner /> : "Enviar Avaliação"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewDialog;

"use server";

import { auth } from "@/auth";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1, "Avaliação mínima é 1").max(5, "Avaliação máxima é 5"),
  comment: z.string().max(500, "Comentário muito longo").optional(),
  barbershopId: z.string().uuid("ID da barbearia inválido"),
});

interface SaveReviewParams {
  rating: number;
  comment?: string;
  barbershopId: string;
}

export const saveReview = async (params: SaveReviewParams) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  // Validar dados
  const validated = reviewSchema.parse(params);

  // Verificar se a barbearia existe
  const barbershop = await db.barbershop.findUnique({
    where: { id: validated.barbershopId },
  });

  if (!barbershop) {
    throw new Error("Barbearia não encontrada");
  }

  // Verificar se o usuário já tem uma avaliação para esta barbearia
  const existingReview = await db.review.findFirst({
    where: {
      userId: session.user.id,
      barbershopId: validated.barbershopId,
    },
  });

  if (existingReview) {
    // Atualizar avaliação existente
    await db.review.update({
      where: { id: existingReview.id },
      data: {
        rating: validated.rating,
        comment: validated.comment,
        updatedAt: new Date(),
      },
    });
  } else {
    // Criar nova avaliação
    await db.review.create({
      data: {
        rating: validated.rating,
        comment: validated.comment,
        userId: session.user.id,
        barbershopId: validated.barbershopId,
      },
    });
  }

  revalidatePath(`/barbershops/${validated.barbershopId}`);
};

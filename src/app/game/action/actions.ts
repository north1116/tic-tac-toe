"use server";

import { prisma } from "@/lib/prisma";

export async function handleUpdateScore(userId: string, winner: string | null, currentWinSteak: number, score: number, newHighestWinSteak: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { winSteak: currentWinSteak, score: score, highestWinSteak: newHighestWinSteak },
  });
}
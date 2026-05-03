import TicTacToeBoard from "@/components/ticTacToeBoard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TicTacToeGame() {
	const session = await auth()
	
	if(!session) redirect("/signIn")

	const user = await prisma.user.findFirst({
		where:{
			id: session.user?.id
		},
		orderBy: [
				{
				score: "desc",
				},
		],
	});

	if(!user) redirect("/signIn")

	return (
	<div className="flex h-screen">
		<div className="m-auto">
			<TicTacToeBoard userId={user?.id} currentWinSteak={user?.winSteak} currentScore={user.score} currentHighestWinSteak={user.highestWinSteak} />
		</div>
	</div>
	)
}
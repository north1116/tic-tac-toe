import BackButton from "@/components/BackButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ScoreBoard() {
	const session = await auth()
	
	if(!session) redirect("/signIn")

	const users = await prisma.user.findMany({
		orderBy: [
			{
			score: "desc",
			},
		],
	});

	return (
    <div className="flex h-screen">
			<div className="m-auto">
				<table className="table-auto m-auto mb-2 bg-blue-500">
					<thead>
						<tr>
							<th className="border-black border-1 p-2">Name</th>
							<th className="border-black border-1 p-2">Highest Win Steak</th>
							<th className="border-black border-1 p-2">Win Steak</th>
							<th className="border-black border-1 p-2">Score</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							const mergeClass = clsx(
								"border-black border-1 p-2",
								user.id == session.user?.id && "bg-red-500"
							)
							return (
								<tr>
									<td className={mergeClass}>{user.name}</td>
									<td className={clsx(
										mergeClass,
										"text-right"
									)}>{user.highestWinSteak}</td>
									<td className={clsx(
										mergeClass,
										"text-right"
									)}>{user.winSteak}</td>
									<td className={clsx(
										mergeClass,
										"text-right"
									)}>{user.score}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<BackButton />
			</div>
    </div>
	)
}
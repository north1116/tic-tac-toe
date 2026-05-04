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
				<table className="table-auto m-auto mb-2 bg-board shadow-[0_0_10px_#ff00e6,0_0_20px_#ff00e6] text-[#00eaff]">
					<thead>
						<tr>
							<th className="border-[#ededed] border-1 p-2">No.</th>
							<th className="border-[#ededed] border-1 p-2">Name</th>
							<th className="border-[#ededed] border-1 p-2">Highest Win Steak</th>
							<th className="border-[#ededed] border-1 p-2">Win Steak</th>
							<th className="border-[#ededed] border-1 p-2">Score</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => {
							const mergeClass = clsx(
								"border-[#ededed] border-1 p-2",
								user.id == session.user?.id && "bg-[#ff00e6] text-foreground"
							)
							return (
								<tr key={user.id}>
									<td className={clsx(
										mergeClass,
										"text-right"
									)}>{index+1}</td>
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
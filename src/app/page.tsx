import { MenuButton } from "@/components/MenuButton";
import { SignOutButton } from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if(!session) redirect("/signIn")

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="mb-2 text-[#ff00e6] text-3xl text-center">{session?.user?.name}</div>
        <div className="mb-5 text-[#00eaff] text-3xl text-center">Welcome to Tic Tac Toe</div>

        <div>
          {/* <div className="border-black border-1">
              <Link href="/game" >Play Game</Link>
          </div> */}
          <MenuButton href="/game">Play Game</MenuButton>
          <MenuButton href="/scoreBoard">View Score Board</MenuButton>
          <SignOutButton />
          {/* <div className="border-black border-1">
              <SignOutButton />
          </div> */}
        </div>
      </div>
    </div>
  );
}

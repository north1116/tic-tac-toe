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
        <div className="mb-2">Hi Welcome to Home Page {session?.user?.name}</div>
        <div>
          <div className="border-black border-1">
              <Link href="/game" >Play Game</Link>
          </div>
          <div className="border-black border-1">
            <Link href="/scoreBoard" >View Score Board</Link>
          </div>
          <div className="border-black border-1">
              <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

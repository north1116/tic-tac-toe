import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth()
    
    if(session) redirect("/")
    return (
    <div className="flex h-screen">
			<div className="m-auto">
				<div className="mb-2">Tic Tac Toe Game Please SignIn</div>
				<SignInButton />
			</div>
    </div>
    )
}
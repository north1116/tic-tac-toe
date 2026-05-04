import { signIn } from "@/lib/auth"

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <div className="
        p-[2px] rounded-xl 
        bg-btn-primary 
      ">
        <button
          type="submit"
          className="
            flex items-center gap-2 w-full
            px-4 py-2 bg-white rounded-lg 
            text-black font-medium 
            hover:bg-gray-100
          "
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </form>
  )
}
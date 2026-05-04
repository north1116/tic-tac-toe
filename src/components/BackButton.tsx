"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/")}
      className="block 
        border border-[#ff00e6] 
        px-6 py-3 
        rounded-xl 
        text-center 
        bg-[#ff00e6] text-black shadow-[0_0_10px_#ff00e6]
        hover:shadow-[0_0_20px_#ff00e6] hover:bg-[#ff54ff]
        font-semibold 
        hover:text-white
        transition-all duration-300"
    >
      Back
    </button>
  )
}
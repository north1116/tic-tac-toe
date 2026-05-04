import Link from "next/link";

export function MenuButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        block 
        border border-[#ff00e6] 
        px-6 py-3 
        my-2
        rounded-xl 
        text-center 
        text-[#00eaff]
        font-semibold 
        shadow-[0_0_10px_#ff00e6,0_0_20px_#ff00e6]
        hover:shadow-[0_0_20px_#ff00e6,0_0_40px_#ff00e6]
        hover:text-white
        transition-all duration-300 w-120
      "
    >
      {children}
    </Link>
  );
}
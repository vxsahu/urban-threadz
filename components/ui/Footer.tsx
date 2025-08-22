import Image from "next/image";
import Link from "next/link";
import SocialMedia from "@/components/social-media";

export default function Footer() {
  return (
    <footer className="bg-[var(--neutral)] border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-8 md:gap-6 w-full">
          {/* Brand */}
          <div className="flex flex-col justify-center items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded" />
              <span className="text-lg font-bold text-[var(--foreground)] tracking-tight">NextThreadz</span>
            </div>
            <p className="text-[var(--secondary)] text-xs text-center max-w-xs">
              Latest streetwear & casual fashion. Quality, comfort, style—delivered.
            </p>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col justify-center items-center flex-1">
            <ul className="flex flex-wrap justify-center gap-4 text-xs font-medium">
              <li>
                <Link href="/about" className="text-[var(--secondary)] hover:text-[var(--foreground)] transition">About</Link>
              </li>
              <li>
                <Link href="/faq" className="text-[var(--secondary)] hover:text-[var(--foreground)] transition">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--secondary)] hover:text-[var(--foreground)] transition">Contact</Link>
              </li>
              <li>
                <Link href="/returns" className="text-[var(--secondary)] hover:text-[var(--foreground)] transition">Returns</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--secondary)] hover:text-[var(--foreground)] transition">Privacy</Link>
              </li>
            </ul>
          </div>
          {/* Socials */}
          <div className="flex flex-row items-center justify-center gap-4 flex-1">
            <SocialMedia />
          </div>
        </div>
        {/* Contact - minimal, only on md+ */}
        <div className="hidden sm:flex justify-center gap-6 text-xs text-[var(--secondary)] mt-2">
          <span>Makkasar, Hanumangarh Rajasthan 335513, India</span>
          <span>
            <a href="mailto:Urbanthreadz240@gmail.com" className="hover:text-[var(--foreground)] transition">Urbanthreadz240@gmail.com</a>
          </span>
          <span>
            <a href="tel:+918502913816" className="hover:text-[var(--foreground)] transition">+91 8502913816</a>
          </span>
        </div>
      </div>
      <div className="text-center text-[var(--secondary)] text-xs py-3 border-t border-[var(--border)]">
          &copy; {new Date().getFullYear()} NextThreadz.
      </div>
    </footer>
  );
}

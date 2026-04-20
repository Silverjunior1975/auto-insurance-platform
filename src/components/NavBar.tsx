import Link from "next/link";

export function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-blue-900">
          Auto Insurance Platform
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/cheap-car-insurance">Cheap Car Insurance</Link>
          <Link href="/sr22-insurance">SR-22 Insurance</Link>
          <Link href="/low-down-payment-insurance">Low Down Payment</Link>
          <Link href="/dui-insurance-help">DUI Help</Link>
          <Link href="/admin/login">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

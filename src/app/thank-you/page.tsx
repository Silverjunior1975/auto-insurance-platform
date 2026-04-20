import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
        <h1 className="text-3xl font-bold text-slate-900">Thank You!</h1>
        <p className="mt-3 text-slate-600">
          Your quote request has been received. A licensed insurance specialist will contact you
          shortly.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

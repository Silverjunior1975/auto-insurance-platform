import Link from "next/link";

export function ContentPage({
  title,
  intro,
  bullets
}: {
  title: string;
  intro: string;
  bullets: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-4 text-slate-700">{intro}</p>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-slate-700">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <Link
          href="/#quote-form"
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Get Free Quote
        </Link>
      </article>
    </div>
  );
}

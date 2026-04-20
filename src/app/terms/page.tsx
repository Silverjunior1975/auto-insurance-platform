export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <h1 className="text-3xl font-bold text-slate-900">Terms and Conditions</h1>
        <p className="mt-4 text-slate-700">
          By using this website, you agree to provide accurate information and to use the site only
          for lawful quote requests.
        </p>
        <p className="mt-4 text-slate-700">
          Quote availability, carrier participation, and rates are not guaranteed. Final policy terms
          are determined by the insurance provider.
        </p>
        <p className="mt-4 text-slate-700">
          We may update these terms at any time. Continued use of the website indicates acceptance of
          revised terms.
        </p>
      </article>
    </div>
  );
}

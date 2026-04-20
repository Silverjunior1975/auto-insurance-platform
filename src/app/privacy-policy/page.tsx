export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-slate-700">
          We collect contact and vehicle information that you submit so we can match you with
          insurance providers and respond to your quote request.
        </p>
        <p className="mt-4 text-slate-700">
          We use your data to provide quote services, communicate regarding your request, and improve
          site performance. We do not sell personal information outside the quote process.
        </p>
        <p className="mt-4 text-slate-700">
          To request updates or deletion of your data, contact support through the contact details
          displayed on this website.
        </p>
      </article>
    </div>
  );
}

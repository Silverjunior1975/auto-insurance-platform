import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Trusted Insurance Marketplace
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Find Cheap Car Insurance Rates in Minutes
            </h1>
            <p className="mt-5 max-w-xl text-lg text-blue-100">
              Compare options from top providers and get connected with affordable policies that fit
              your budget.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
              <span className="rounded-lg bg-white/10 px-3 py-2">Fast quote matching</span>
              <span className="rounded-lg bg-white/10 px-3 py-2">No obligation</span>
              <span className="rounded-lg bg-white/10 px-3 py-2">Mobile friendly</span>
            </div>
            <div className="mt-8">
              <Link
                href="#quote-form"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-100"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
          <div id="quote-form">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

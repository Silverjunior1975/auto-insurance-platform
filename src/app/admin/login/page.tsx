import { redirect } from "next/navigation";

import { createAdminSession, isAdminAuthenticated, isValidAdminPassword } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/leads");
  }

  async function loginAction(formData: FormData) {
    "use server";

    const password = String(formData.get("password") ?? "");
    if (!isValidAdminPassword(password)) {
      redirect("/admin/login?error=1");
    }

    await createAdminSession();
    redirect("/admin/leads");
  }

  const params = await searchParams;

  return (
    <div className="mx-auto w-full max-w-md px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your admin password to manage leads.</p>
        {params.error ? <p className="mt-3 text-sm text-red-600">Incorrect password.</p> : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

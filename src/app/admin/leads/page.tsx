import Link from "next/link";
import { redirect } from "next/navigation";

import { clearAdminSession, isAdminAuthenticated } from "@/lib/auth";
import { getLeads, updateLeadStatus } from "@/lib/db";
import { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = ["New", "Contacted", "Sold"];

export default async function AdminLeadsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const leads = await getLeads();

  async function logoutAction() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  async function updateStatusAction(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const status = String(formData.get("status")) as LeadStatus;
    if (!Number.isNaN(id) && statuses.includes(status)) {
      await updateLeadStatus(id, status);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">Manage submitted auto insurance leads.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/api/admin/leads/export"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Export CSV
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Coverage</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-100 align-top">
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{lead.fullName}</p>
                  <p className="text-slate-600">{lead.zipCode}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <p>{lead.phone}</p>
                  <p>{lead.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {lead.carYear} {lead.carMake} {lead.carModel}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <p>Current: {lead.currentInsurance}</p>
                  <p>SR-22: {lead.needSr22}</p>
                </td>
                <td className="px-4 py-3">
                  <form action={updateStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-700 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-800"
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

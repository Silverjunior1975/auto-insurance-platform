import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";
import { getLeads } from "@/lib/db";

function csvEscape(value: string | number): string {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
    return `"${stringValue.replaceAll("\"", "\"\"")}"`;
  }
  return stringValue;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const leads = await getLeads();
  const headers = [
    "id",
    "createdAt",
    "fullName",
    "phone",
    "email",
    "zipCode",
    "carYear",
    "carMake",
    "carModel",
    "currentInsurance",
    "needSr22",
    "status"
  ];

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.createdAt,
      lead.fullName,
      lead.phone,
      lead.email,
      lead.zipCode,
      lead.carYear,
      lead.carMake,
      lead.carModel,
      lead.currentInsurance,
      lead.needSr22,
      lead.status
    ]
      .map(csvEscape)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`
    }
  });
}

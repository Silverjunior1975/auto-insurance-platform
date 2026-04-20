export type LeadStatus = "New" | "Contacted" | "Sold";

export interface LeadInput {
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  carYear: number;
  carMake: string;
  carModel: string;
  currentInsurance: "Yes" | "No";
  needSr22: "Yes" | "No";
}

export interface Lead extends LeadInput {
  id: number;
  status: LeadStatus;
  createdAt: string;
}

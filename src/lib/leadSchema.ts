import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, "Use a valid phone number"),
  email: z.string().email("Use a valid email address").max(120),
  zipCode: z
    .string()
    .length(5, "ZIP code must be 5 digits")
    .regex(/^\d{5}$/, "ZIP code must be numeric"),
  carYear: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  carMake: z.string().min(2, "Car make is required").max(60),
  carModel: z.string().min(1, "Car model is required").max(60),
  currentInsurance: z.enum(["Yes", "No"]),
  needSr22: z.enum(["Yes", "No"])
});

export type LeadFormValues = z.infer<typeof leadSchema>;

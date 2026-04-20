"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  zipCode: "",
  carYear: "",
  carMake: "",
  carModel: "",
  currentInsurance: "Yes",
  needSr22: "No"
};

export function LeadForm() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? "Unable to submit right now. Please try again.");
      setIsSubmitting(false);
      return;
    }

    router.push("/thank-you");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50"
    >
      <h2 className="text-2xl font-semibold text-slate-900">Get Free Quote</h2>
      <p className="mt-1 text-sm text-slate-600">
        Fill out this short form and get matched with affordable rates.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full Name" name="fullName" value={values.fullName} onChange={setValues} />
        <Input label="Phone Number" name="phone" value={values.phone} onChange={setValues} />
        <Input label="Email" name="email" type="email" value={values.email} onChange={setValues} />
        <Input label="ZIP Code" name="zipCode" value={values.zipCode} onChange={setValues} />
        <Input label="Car Year" name="carYear" type="number" value={values.carYear} onChange={setValues} />
        <Input label="Car Make" name="carMake" value={values.carMake} onChange={setValues} />
        <Input label="Car Model" name="carModel" value={values.carModel} onChange={setValues} />

        <Select
          label="Current Insurance?"
          name="currentInsurance"
          value={values.currentInsurance}
          onChange={setValues}
          options={["Yes", "No"]}
        />
        <Select
          label="Need SR-22?"
          name="needSr22"
          value={values.needSr22}
          onChange={setValues}
          options={["Yes", "No"]}
        />
      </div>

      <p className="mt-4 text-xs text-slate-500">
        By clicking submit, you agree to receive calls and texts from our insurance partners using
        automated technology, including prerecorded messages, at the number provided. Consent is not
        a condition of purchase.
      </p>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Get Free Quote"}
      </button>
    </form>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  name: keyof typeof initialValues;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  type?: string;
}) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange((old) => ({ ...old, [name]: event.target.value }))}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options
}: {
  label: string;
  name: keyof typeof initialValues;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  options: string[];
}) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange((old) => ({ ...old, [name]: event.target.value }))}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

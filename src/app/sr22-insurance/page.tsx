import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "SR-22 Insurance",
  description: "Get matched with insurers that can file SR-22 forms quickly and affordably."
};

export default function Sr22InsurancePage() {
  return (
    <ContentPage
      title="SR-22 Insurance"
      intro="If your state requires SR-22 filing, we connect you with carriers familiar with high-risk policies and compliant filings."
      bullets={[
        "Fast SR-22 filing support for eligible drivers.",
        "State-compliant policy options tailored to your needs.",
        "Clear guidance on timelines and reinstatement requirements."
      ]}
    />
  );
}

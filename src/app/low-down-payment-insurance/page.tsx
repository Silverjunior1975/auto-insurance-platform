import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Low Down Payment Insurance",
  description: "Explore auto insurance options with lower upfront payment requirements."
};

export default function LowDownPaymentInsurancePage() {
  return (
    <ContentPage
      title="Low Down Payment Insurance"
      intro="Need coverage without a large upfront cost? We help you compare flexible payment options from trusted auto insurers."
      bullets={[
        "Identify plans with affordable initial payments.",
        "Understand monthly payment structures before enrolling.",
        "Balance low down payment options with reliable coverage."
      ]}
    />
  );
}

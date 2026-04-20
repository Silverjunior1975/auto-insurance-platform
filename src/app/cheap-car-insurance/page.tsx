import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Cheap Car Insurance",
  description: "Learn how to secure cheap car insurance with better coverage options."
};

export default function CheapCarInsurancePage() {
  return (
    <ContentPage
      title="Cheap Car Insurance"
      intro="Cheap car insurance does not mean sacrificing coverage. We help drivers compare quality policies and reduce monthly premiums."
      bullets={[
        "Compare multiple carriers in one simple request.",
        "Find discounts for safe driving, bundled policies, and low annual mileage.",
        "Review coverage options to avoid paying for unnecessary add-ons."
      ]}
    />
  );
}

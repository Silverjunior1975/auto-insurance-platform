import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "DUI Insurance Help",
  description: "Find insurance providers that work with drivers after a DUI."
};

export default function DuiInsuranceHelpPage() {
  return (
    <ContentPage
      title="DUI Insurance Help"
      intro="After a DUI, rates often increase. We make it easier to compare insurers and find practical policy options while rebuilding your driving profile."
      bullets={[
        "Compare high-risk driver options from multiple providers.",
        "Learn practical ways to reduce costs over time.",
        "Get support finding compliant coverage quickly."
      ]}
    />
  );
}

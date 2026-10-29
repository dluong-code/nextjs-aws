import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import ContactSteps from "@/components/ContactSteps";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TL Nails Academy. Leave your details and our team will help you find the right nail course.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <ContactSteps />
    </>
  );
}

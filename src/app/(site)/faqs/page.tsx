import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find quick answers to the most common questions about our nail courses, training and support.",
};

// Placeholder answers: replace with confirmed details before launch
const FAQS: FaqItem[] = [
  {
    id: "courses",
    question: "What courses do you offer?",
    answer:
      "We offer beginner courses such as Gel Polish Foundations and Builder Gel Essentials, skill development courses, advanced training including our Nail Art Masterclass, and 1:1 mentoring sessions tailored to your goals.",
  },
  {
    id: "experience",
    question: "Do I need any previous experience?",
    answer:
      "Not always. Our beginner courses are designed for complete beginners, with step-by-step guidance and ongoing support. We also offer advanced courses for those with existing experience.",
  },
  {
    id: "duration",
    question: "How long are the courses?",
    answer:
      "Most courses run for one or two days, and 1:1 mentoring sessions are a half day. The exact length is listed on each course page, along with the start and finish times.",
  },
  {
    id: "included",
    question: "What is included in the training?",
    answer:
      "Every course combines theory with hands-on practice on live models, plus a course manual, use of professional products during the session, and guidance on health, safety and hygiene.",
  },
  {
    id: "certificate",
    question: "Will I receive a certificate?",
    answer:
      "Yes. You'll receive a TL Nails Academy certificate when you successfully complete any of our accredited courses. 1:1 mentoring sessions are focused on skill-building and don't include a certificate.",
  },
  {
    id: "kit",
    question: "Do you provide a kit?",
    answer:
      "All products and tools are provided for you to use during your training. Some courses include a starter kit to take home. Check the course page for what's included, or ask us about kit add-ons.",
  },
  {
    id: "instalments",
    question: "Can I pay by instalments?",
    answer:
      "Yes. You can secure your place with a deposit and spread the remaining balance over instalments before your course date. Get in touch and we'll talk you through the options.",
  },
  {
    id: "location",
    question: "Where are you based?",
    answer:
      "All training takes place at the TL Nails Academy studio. You'll receive the full address and directions, including parking information, in your booking confirmation.",
  },
  {
    id: "booking",
    question: "How do I book a course?",
    answer:
      "Choose your course on the Courses page and select an available date to book online. If you'd like help deciding which course is right for you, contact us and we'll be happy to advise.",
  },
  {
    id: "support",
    question: "Is there ongoing support?",
    answer:
      "Absolutely. Your learning doesn't stop when the course ends. You'll have ongoing support after your training to answer questions, give feedback on your work and help you build your confidence.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Your Questions Answered"
        description="Find quick answers to the most common questions about our nail courses, training and support."
        image={{
          src: "/banners/faqs-hero.jpg",
          alt: "Glossy nude almond-shaped nails resting on a stone surface beside a sage green jar.",
        }}
      />
      <FaqAccordion items={FAQS} defaultOpenId="experience" />
      <CtaBanner
        eyebrow="Take the next step"
        title={"Ready to start\nyour nail journey?"}
        description="Learn real skills, gain confidence and create new opportunities with expert training and ongoing support."
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Book a Course", href: "/courses" }}
        image={{
          src: "/banners/cta-polish.jpg",
          alt: "A dropper lifting nude pink polish from an open bottle.",
        }}
      />
    </>
  );
}

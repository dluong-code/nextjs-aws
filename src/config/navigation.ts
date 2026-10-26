export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Student Results", href: "/student-results" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const COURSE_LINKS: NavLink[] = [
  { label: "Beginner Courses", href: "/courses/beginner" },
  { label: "Skill Development", href: "/courses/skill-development" },
  { label: "Advanced Training", href: "/courses/advanced" },
  { label: "1:1 Mentoring", href: "/courses/one-to-one-mentoring" },
  { label: "Book a Course", href: "/courses" },
];

export const CONTACT = {
  email: "info@tlnailsacademy.co.uk",
  location: "TL Nails Academy",
  socialHandle: "@tlnailsacademy",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/tlnailsacademy" },
    { label: "Facebook", href: "https://www.facebook.com/tlnailsacademy" },
    { label: "TikTok", href: "https://www.tiktok.com/@tlnailsacademy" },
  ],
} as const;

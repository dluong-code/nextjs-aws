import type { Metadata } from "next";
import { Fragment } from "react";
import DualCta from "@/components/DualCta";
import HighlightsBar, { type Highlight } from "@/components/HighlightsBar";
import {
  CalendarDaysIcon,
  GraduationCapIcon,
  HeartIcon,
  StoreIcon,
  UsersIcon,
} from "@/components/icons";
import MyStory from "@/components/MyStory";
import VideoHeroBanner from "@/components/VideoHeroBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Tuyet, founder of TL Nails Academy: educator, salon owner and mentor, teaching high-quality, practical nail education.",
};

const HIGHLIGHTS: Highlight[] = [
  {
    id: "experience",
    icon: <CalendarDaysIcon />,
    title: "10+",
    description: "Years in the Nail Industry",
    stat: true,
  },
  {
    id: "salon-owner",
    icon: <StoreIcon />,
    title: "Salon Owner Experience",
    description: "Real, hands-on industry knowledge",
  },
  {
    id: "hands-on",
    icon: <GraduationCapIcon />,
    title: "Hands-On Training",
    description: "Practical, salon-focused education",
  },
  {
    id: "small-classes",
    icon: <UsersIcon />,
    title: "Small Class Sizes",
    description: "Personalised learning and support",
  },
  {
    id: "support",
    icon: <HeartIcon />,
    title: "Ongoing Support",
    description: "Guidance beyond the classroom",
  },
];

export default function AboutPage() {
  return (
    <>
      <VideoHeroBanner
        eyebrow="About me"
        title="Meet Tuyet"
        roles={["Founder", "Educator", "Salon Owner", "Mentor"]}
        description="I'm Tuyet, the founder of TL Nails Academy. I'm passionate about teaching high-quality, practical nail education that helps you build real skills, grow your confidence and create opportunities in the nail industry."
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Get in Touch", href: "/contact" }}
        background={{
          mobile: { src: "/about/hero-bg-mobile.jpg", width: 490, height: 786 },
          tablet: { src: "/about/hero-bg-tablet.jpg", width: 740, height: 786 },
          desktop: { src: "/about/hero-bg-desktop.jpg", width: 1671, height: 941 },
        }}
        video={{
          heading: "What Drives Me",
          description:
            "A short video about my passion, purpose and the story behind TL Nails Academy.",
          title: "What Drives Me: a short video from Tuyet, founder of TL Nails Academy",
          // Placeholder: Tuyet's Instagram reel until the final video is ready
          embedUrl: "https://www.instagram.com/reel/DeZ72FuOn8i/embed/",
          poster: {
            src: "/about/video-thumbnail.jpg",
            alt: "Tuyet smiling and leaning against the TL Nails Academy sign in her studio, arms folded.",
          },
        }}
      />
      <HighlightsBar items={HIGHLIGHTS} label="Why learn with Tuyet" />
      <MyStory
        eyebrow="My story"
        title="My Story"
        paragraphs={[
          "My journey into nails began over 10 years ago, when I fell in love with the creativity, confidence and opportunities this industry can offer.",
          // Keys are needed because these paragraphs are passed as a list
          <Fragment key="training">
            As a salon owner and experienced educator, I&rsquo;ve seen first-hand how the right
            training can change lives. My passion is to help aspiring nail
            artists build real skills, grow their confidence and create brighter futures, whether
            that&rsquo;s working in a salon, starting your own business, or simply doing something
            you love.
          </Fragment>,
          <Fragment key="academy">
            I created <strong>TL Nails Academy</strong> to share my knowledge, experience and
            everything I&rsquo;ve learned, so you can take the next step with the right guidance
            and support.
          </Fragment>,
        ]}
        signOff={{ name: "Tuyet Luong", role: "Founder, TL Nails Academy" }}
        image={{
          src: "/about/tuyet-portrait.jpg",
          alt: "Tuyet Luong, founder of TL Nails Academy, smiling at a marble table in her studio, wearing a TL Nails Academy apron.",
        }}
      />
      <DualCta
        enquiry={{
          eyebrow: "Have questions?",
          title: "Find out more about the courses, training options and how to get started.",
          cta: { label: "Get in Touch", href: "/contact" },
        }}
        booking={{
          eyebrow: "Your nail journey starts here",
          title: "Ready to start your nail journey?",
          description:
            "Learn real skills, gain confidence and create new opportunities with expert training and ongoing support.",
          primaryCta: { label: "Explore Courses", href: "/courses" },
          secondaryCta: { label: "Book a Course", href: "/courses" },
          image: "/courses/beginner-1.jpg",
        }}
      />
    </>
  );
}

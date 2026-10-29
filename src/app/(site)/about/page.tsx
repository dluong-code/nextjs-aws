import type { Metadata } from "next";
import VideoHeroBanner from "@/components/VideoHeroBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Tuyet, founder of TL Nails Academy: educator, salon owner and mentor, teaching high-quality, practical nail education.",
};

export default function AboutPage() {
  return (
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
        description: "A short video about my passion, purpose and the story behind TL Nails Academy.",
        title: "What Drives Me: a short video from Tuyet, founder of TL Nails Academy",
        // Placeholder: Tuyet's Instagram reel until the final video is ready
        embedUrl: "https://www.instagram.com/reel/DeZ72FuOn8i/embed/",
        poster: {
          src: "/about/video-poster.jpg",
          alt: "Tuyet smiling as she guides a student through a manicure.",
        },
      }}
    />
  );
}

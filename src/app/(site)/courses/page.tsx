import type { Metadata } from "next";
import CourseShowcase, { type CourseSummary } from "@/components/CourseShowcase";
import FeatureBar, { type Feature } from "@/components/FeatureBar";
import HelpBanner from "@/components/HelpBanner";
import { AwardIcon, DiamondIcon, GraduationCapIcon, LayersIcon, LeafIcon, UsersIcon } from "@/components/icons";
import Slider, { type Slide } from "@/components/Slider";
import WhyTrainWithUs, { type Reason } from "@/components/WhyTrainWithUs";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Professional nail courses at TL Nails Academy, from Beginners Gel Polish to The Master Class. Build real skills with expert, hands-on training.",
};

const HERO_SLIDES: Slide[] = [
  {
    id: "nail-courses",
    eyebrow: "Professional Nail Training",
    title: "Nail Courses\nat TL Nails Academy",
    description: "Build real skills, confidence and a successful nail career with expert, hands-on training.",
    primaryCta: { label: "Explore Courses", href: "#our-courses" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: {
      src: "/TL_Nails_Hero_04_nail_art_collection.png",
      alt: "A row of glossy nude almond nails with marbled nail art on a speckled stone surface.",
    },
  },
  {
    id: "small-classes",
    eyebrow: "Small Classes, Real Practice",
    title: "Learn Hands-On\nWith Expert Guidance",
    description: "Practise on real models in small groups, with one-to-one feedback at every step.",
    primaryCta: { label: "Explore Courses", href: "#our-courses" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: {
      src: "/TL_Nails_Hero_05_educator_training.png",
      alt: "A smiling nail educator in a TL Nails Academy apron.",
    },
  },
  {
    id: "certified",
    eyebrow: "Industry-Recognised Certificates",
    title: "Train Today.\nGrow Your Career.",
    description: "Finish every accredited course with a certificate and the confidence to start working.",
    primaryCta: { label: "Explore Courses", href: "#our-courses" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: {
      src: "/TL_Nails_Hero_03_academy_studio.png",
      alt: "The TL Nails Academy studio, with the academy's name on the wall.",
    },
  },
];

const FEATURES: Feature[] = [
  { id: "expert-led", icon: <GraduationCapIcon />, title: "Expert-Led Training" },
  { id: "hands-on", icon: <LayersIcon />, title: "Hands-On Practice" },
  { id: "certificate", icon: <AwardIcon />, title: "Industry-Recognised Certificate" },
  { id: "support", icon: <LeafIcon />, title: "Ongoing Support" },
];

const COURSES: CourseSummary[] = [
  {
    id: "beginners-gel-polish",
    title: "Beginners Gel Polish",
    brief: "Build a strong foundation in nail prep, cuticle care and flawless Gel Polish application.",
    href: "/courses/beginners-gel-polish",
    image: {
      src: "/courses/beginner-1.jpg",
      alt: "Glossy nude almond nails resting on a speckled stone surface.",
    },
  },
  {
    id: "builder-gel",
    title: "Builder Gel Overlay and Extensions",
    brief: "Create strong, natural-looking overlays and extensions with Builder Gel techniques.",
    href: "/courses/builder-gel-overlay-and-extensions",
    image: {
      src: "/courses/skill-development-1.jpg",
      alt: "A gloved nail technician shaping gel on a client's nails with a fine brush.",
      position: "60% center",
    },
  },
  {
    id: "hard-gel",
    title: "Hard Gel Extensions",
    brief: "Sculpt durable, beautifully shaped Hard Gel extensions, from form to flawless finish.",
    href: "/courses/hard-gel-extensions",
    image: {
      src: "/courses/TL_Nails_Clean_Hero_01_Nude_Manicure.jpg",
      alt: "Long nude almond extensions beside a sage green jar.",
      position: "80% center",
    },
  },
  {
    id: "acrylics",
    title: "Acrylics",
    brief: "Learn to apply, shape and refine long-lasting acrylic enhancements with confidence.",
    href: "/courses/acrylics",
    image: {
      src: "/courses/TL_Nails_Clean_Hero_02_Hands_On_Training.jpg",
      alt: "A nail technician applying product to a client's nails with a brush.",
      position: "65% center",
    },
  },
  {
    id: "master-class",
    title: "The Master Class",
    brief: "Take your skills to the next level with advanced techniques, nail art and salon-ready finishes.",
    href: "/courses/the-master-class",
    image: {
      src: "/courses/advanced-1.jpg",
      alt: "A row of nude nails with marbled and gold-leaf nail art.",
    },
  },
];

const REASONS: Reason[] = [
  {
    id: "experience",
    icon: <DiamondIcon />,
    title: "Real Industry Experience",
    description: "Learn from a qualified nail professional with years of salon and teaching experience.",
  },
  {
    id: "small-classes",
    icon: <UsersIcon />,
    title: "Small Class Sizes",
    description: "Personalised guidance and hands-on support every step of the way.",
  },
  {
    id: "practical",
    icon: <AwardIcon />,
    title: "Practical Skills",
    description: "Gain real, salon-ready skills you can use immediately.",
  },
  {
    id: "guidance",
    icon: <LeafIcon />,
    title: "Ongoing Guidance",
    description: "Continued support even after you complete your course.",
  },
];

export default function CoursesPage() {
  return (
    <>
      <CourseShowcase
        title="Our Courses"
        description="Choose from our range of professional nail courses, designed for all levels, from beginners to those ready to advance their skills."
        courses={COURSES}
      />
      {/* <Slider slides={HERO_SLIDES} titleSize="compact" /> */}
      <FeatureBar features={FEATURES} label="What every course includes" variant="plain" />
      <HelpBanner
        eyebrow="Not sure which course is right for you?"
        title="We’re Here to Help"
        description="Get personalised advice on the best course for your goals, experience level and career plans."
        cta={{ label: "Contact Us", href: "/contact" }}
        image="/banners/cta-polish.jpg"
      />
      <WhyTrainWithUs title="Why Train With Us?" reasons={REASONS} />
    </>
  );
}

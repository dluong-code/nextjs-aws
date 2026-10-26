import AboutIntro, { type AboutIntroProps } from "@/components/AboutIntro";
import { type Course } from "@/components/CourseCard";
import CourseCategory, { type CourseCategoryItem } from "@/components/CourseCategory";
import Footer from "@/components/Footer";
import FeaturedCourse from "@/components/FeaturedCourse";
import FeatureBar, { type Feature } from "@/components/FeatureBar";
import Header from "@/components/Header";
import { ConfidenceIcon, HeartBadgeIcon, PolishIcon, SproutStarIcon } from "@/components/icons";
import Slider, { type Slide } from "@/components/Slider";

const HERO_SLIDES: Slide[] = [
  {
    id: "learn-create-build",
    eyebrow: "Professional Nail Education",
    title: "Learn. Create.\nBuild Your Future.",
    description:
      "High-quality, hands-on nail education designed to give you the skills, confidence and support to build a successful career in nails.",
    primaryCta: { label: "Explore Courses", href: "/courses" },
    secondaryCta: { label: "About Me", href: "/about" },
    tagline: "More\nthan just\nnails",
    image: {
      src: "/hero-slide-1.png",
      alt: "A nail technician working on a client's nails in a professional salon setting.",
    },
  },
  {
    id: "hands-on-training",
    eyebrow: "Small Classes, Real Practice",
    title: "Hands-On Training.\nReal Results.",
    description:
      "Learn step by step with live models, expert guidance and ongoing support long after your course ends.",
    primaryCta: { label: "View Courses", href: "/courses" },
    secondaryCta: { label: "Student Results", href: "/student-results" },
    tagline: "More\nthan just\nnails",
    image: {
      src: "/hero-slide-2.png",
      alt: "A nail technician working on a client's nails in a professional salon setting.",
    },
  },
];

const FEATURES: Feature[] = [
  {
    id: "beginner-friendly",
    icon: <SproutStarIcon />,
    title: "Beginner Friendly",
    description: "Step-by-step guidance at every stage",
  },
  {
    id: "hands-on-training",
    icon: <PolishIcon />,
    title: "Hands-on Training",
    description: "Learn real techniques in a supportive environment",
  },
  {
    id: "expert-educator",
    icon: <HeartBadgeIcon />,
    title: "Expert Educator",
    description: "Industry experience and ongoing support",
  },
  {
    id: "build-confidence",
    icon: <ConfidenceIcon />,
    title: "Build Your Confidence",
    shortTitle: "Build Confidence",
    description: "Gain the skills to create your future",
  },
];

const COURSE_CATEGORIES: CourseCategoryItem[] = [
  {
    id: "beginner",
    title: "Beginner Courses",
    description: "Start your nail journey with the essentials.",
    href: "/courses/beginner",
    image: {
      src: "/courses/beginner.jpg",
      alt: "Close-up of a nail technician shaping natural nails.",
    },
  },
  {
    id: "skill-development",
    title: "Skill Development",
    description: "Build confidence and refine your technique.",
    href: "/courses/skill-development",
    image: {
      src: "/courses/skill-development.jpg",
      alt: "Gel polish being applied with a fine brush.",
    },
  },
  {
    id: "advanced",
    title: "Advanced Training",
    description: "Take your skills to the next level and specialise.",
    href: "/courses/advanced",
    image: {
      src: "/courses/advanced.jpg",
      alt: "A collection of soft pink almond nail tips with marble art.",
    },
  },
];

const FEATURED_COURSES: Course[] = [
  {
    id: "gel-polish-foundations",
    title: "Gel Polish Foundations",
    description: "Master the basics with expert guidance and hands-on practice.",
    href: "/courses/gel-polish-foundations",
    price: 250,
    duration: "1 Day",
    level: "Beginner Friendly",
    certificate: true,
    image: {
      src: "/courses/beginner.jpg",
      alt: "Glossy nude gel polish on almond-shaped nails.",
    },
  },
  {
    id: "builder-gel-essentials",
    title: "Builder Gel Essentials",
    description: "Learn the core skills for strong, beautiful and long-lasting results.",
    href: "/courses/builder-gel-essentials",
    price: 450,
    duration: "2 Days",
    level: "Beginner Friendly",
    certificate: true,
    image: {
      src: "/courses/skill-development.jpg",
      alt: "Builder gel being applied to a natural nail with a fine brush.",
    },
  },
  {
    id: "nail-art-masterclass",
    title: "Nail Art Masterclass",
    description: "Develop your creativity and learn in-demand nail art techniques.",
    href: "/courses/nail-art-masterclass",
    price: 280,
    duration: "1 Day",
    level: "All Levels",
    certificate: true,
    image: {
      src: "/courses/advanced.jpg",
      alt: "Pink almond nail tips with marble and gold-leaf nail art.",
    },
  },
  {
    id: "one-to-one-mentoring",
    title: "1:1 Mentoring Session",
    description: "Personal coaching tailored to your goals, technique and business.",
    href: "/courses/one-to-one-mentoring",
    price: 180,
    duration: "Half Day",
    level: "All Levels",
    certificate: false,
    image: {
      src: "/courses/mentoring.jpg",
      alt: "Smiling nail educator in a TL Nails Academy apron.",
    },
  },
];

const ABOUT_INTRO: AboutIntroProps = {
  title: "More than a course.\nA supportive journey.",
  description:
    "At TL Nails Academy, I'm passionate about helping others build real skills, confidence and opportunities in the nail industry. You'll receive hands-on training, ongoing support and guidance every step of the way.",
  cta: { label: "My Story", href: "/about" },
  stats: [
    { value: "100+", label: "Students Trained" },
    { value: "5★", label: "Rated by Students" },
    { value: "Ongoing", label: "Support" },
    { value: "Real Skills", label: "Real Opportunities" },
  ],
  image: {
    alt: "Smiling nail educator in a TL Nails Academy apron at her studio.",
    desktop: { src: "/about/about-intro-desktop.png", width: 345, height: 138 },
    mobile: { src: "/about/about-intro-mobile.png", width: 128, height: 154 },
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Slider slides={HERO_SLIDES} />
        <FeatureBar features={FEATURES} />
        <CourseCategory
          title="Find the right course for you"
          subtitle="Whether you're just starting or ready to take your skills further, there's a course for you."
          categories={COURSE_CATEGORIES}
        />
        <FeaturedCourse courses={FEATURED_COURSES} />
        <AboutIntro {...ABOUT_INTRO} />
      </main>
      <Footer />
    </>
  );
}

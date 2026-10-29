"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import ContactForm from "@/components/ContactForm";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { CONTACT } from "@/config/navigation";
import { MOTION } from "@/lib/motion";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(useGSAP, SplitText);

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
};

const STICKER_TEXT = "We reply within 1–2 working days • Say hello • ";

/** Top of the contact page: a warm intro and studio photo beside the enquiry form. */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.allowed, () => {
        const q = gsap.utils.selector(sectionRef);
        const split = SplitText.create(q("[data-intro='title']"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
        });

        gsap
          .timeline({ delay: 0.15, defaults: { ease: MOTION.ease } })
          .fromTo(
            q("[data-intro='eyebrow']"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base },
            0,
          )
          .set(q("[data-intro='title']"), { autoAlpha: 1 }, 0.1)
          .fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: MOTION.duration.heading, stagger: 0.1 },
            0.1,
          )
          // The handwritten note pops on like a sticker
          .fromTo(
            q("[data-intro='script']"),
            { autoAlpha: 0, scale: 0.6, rotate: 6 },
            { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.8, ease: "back.out(2)" },
            0.55,
          )
          .fromTo(
            q("[data-intro='copy']"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: MOTION.stagger },
            0.5,
          )
          // The photo's arch rises up from the bottom like polish filling a nail
          .fromTo(
            q("[data-intro='media']"),
            { autoAlpha: 0, clipPath: "inset(100% 0% 0% 0%)" },
            { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" },
            0.3,
          )
          .fromTo(
            q("[data-intro='media'] img"),
            { scale: 1.15 },
            { scale: 1, duration: 1.6, ease: "power2.out" },
            0.3,
          )
          .fromTo(
            q("[data-intro='sticker']"),
            { autoAlpha: 0, scale: 0, rotate: -90 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" },
            1.1,
          )
          .fromTo(
            q("[data-intro='card']"),
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.reveal },
            0.45,
          )
          .fromTo(
            q("[data-intro='card'] > *"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: MOTION.stagger },
            0.65,
          );

        return () => split.revert();
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.copy}>
            <p className={styles.eyebrow} data-intro="eyebrow">
              Contact
            </p>
            <div className={styles.heading}>
              <h1 id="contact-title" className={styles.title} data-intro="title">
                Let&rsquo;s talk nails
              </h1>
              <span className={styles.script} data-intro="script" aria-hidden="true">
                say hello!
              </span>
            </div>
            <p className={styles.description} data-intro="copy">
              Whether you&rsquo;re booking your very first course or ready to level up your skills,
              we&rsquo;d love to hear from you. Leave your details and we&rsquo;ll get back to you
              personally.
            </p>
            <div className={styles.social} data-intro="copy">
              <p className={styles.socialLabel}>Prefer to DM? Find us at {CONTACT.socialHandle}</p>
              <ul className={styles.socialLinks}>
                {CONTACT.social.map(({ label, href }) => {
                  const Icon = SOCIAL_ICONS[label];
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${label} (opens in a new tab)`}
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.media} data-intro="media">
              <Image
                src="/courses/mentoring-1.jpg"
                alt="The TL Nails Academy studio, with sage velvet chairs at marble nail stations beneath arched shelves."
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 600px) 40vw, 1px"
                loading="eager"
                className={styles.image}
              />
            </div>
            <div className={styles.sticker} data-intro="sticker" aria-hidden="true">
              <svg viewBox="0 0 120 120" className={styles.stickerRing}>
                <defs>
                  <path id="contact-sticker-path" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
                </defs>
                <text className={styles.stickerText}>
                  <textPath href="#contact-sticker-path" textLength="276" lengthAdjust="spacing">
                    {STICKER_TEXT}
                  </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className={styles.stickerHeart}>
                <path d="M12 20s-7-4.35-7-9.5A3.9 3.9 0 0 1 12 8.2a3.9 3.9 0 0 1 7 2.3C19 15.65 12 20 12 20Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.card} data-intro="card">
          <ContactForm
            intro={
              <div>
                <h2 className={styles.cardTitle}>Send us your details</h2>
                <p className={styles.cardCopy}>
                  It takes less than a minute, and there&rsquo;s no spam, ever.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

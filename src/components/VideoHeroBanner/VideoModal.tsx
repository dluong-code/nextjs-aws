"use client";

import gsap from "gsap";
import { type MouseEvent, type SyntheticEvent, useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./VideoModal.module.css";

export type Video = {
  /** Accessible name for the player */
  title: string;
  /** A video file (e.g. /videos/about.mp4), played with the browser's own player */
  src?: string;
  /** Or an embeddable page, such as an Instagram reel's /embed/ URL */
  embedUrl?: string;
};

type VideoModalProps = {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
};

const motionAllowed = () => window.matchMedia(MOTION.allowed).matches;

/**
 * Pop-up video player built on the native <dialog>, which traps focus, closes
 * on Escape and returns focus to the button that opened it. The player is only
 * mounted while open, so nothing loads until someone presses play.
 */
export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel || !isOpen) return;

    dialog.showModal();
    const root = document.documentElement;
    root.style.overflow = "hidden";

    if (motionAllowed()) {
      gsap.fromTo(dialog, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 32, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: MOTION.ease, delay: 0.05 },
      );
    }

    return () => {
      gsap.killTweensOf([dialog, panel]);
      gsap.set([dialog, panel], { clearProps: "all" });
      isClosingRef.current = false;
      root.style.overflow = "";
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function requestClose() {
    if (isClosingRef.current) return;
    if (!motionAllowed()) {
      onClose();
      return;
    }

    isClosingRef.current = true;
    gsap.to(panelRef.current, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.25, ease: "power2.in" });
    gsap.to(dialogRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.05, onComplete: onClose });
  }

  // Escape: play the closing animation instead of snapping shut
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    requestClose();
  }

  // Clicks on the dimmed area around the player close it
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) requestClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={video.title}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div ref={panelRef} className={styles.panel}>
        <button type="button" className={styles.close} onClick={requestClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {isOpen && (
          <div className={styles.frame}>
            {video.src ? (
              <video className={styles.media} src={video.src} controls autoPlay playsInline />
            ) : (
              video.embedUrl && (
                <iframe
                  className={styles.media}
                  src={video.embedUrl}
                  title={video.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}

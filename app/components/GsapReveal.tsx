"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function GsapReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Set initial hidden states immediately (prevents flash) ──
    gsap.set(".reveal-card", { opacity: 0, y: 44, scale: 0.97 });
    gsap.set(".reveal-left", { opacity: 0, x: -32 });
    gsap.set(".reveal-right", { opacity: 0, x: 32 });

    // ── 1. General dissolve reveals ──
    const dissolveEls = gsap.utils.toArray<HTMLElement>(".reveal");
    if (dissolveEls.length) {
      ScrollTrigger.batch(dissolveEls, {
        interval: 0.12,
        batchMax: 6,
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.85, ease: "power3.out", stagger: 0.07,
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.7, ease: "power3.out", stagger: 0.06,
          }),
        onLeave: (batch) =>
          gsap.to(batch, { opacity: 0, y: 18, duration: 0.5, ease: "power1.in" }),
      });
    }

    // ── 2. Card grids — grouped stagger per section ──
    document.querySelectorAll<HTMLElement>(".reveal-cards-group").forEach((group) => {
      const cards = gsap.utils.toArray<HTMLElement>(".reveal-card", group);
      if (!cards.length) return;
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, ease: "power3.out", stagger: 0.1,
        scrollTrigger: {
          trigger: group,
          start: "top 82%",
        },
      });
    });

    // ── 3. Slide from left (sequential per element) ──
    gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, x: 0,
        duration: 0.65, ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // ── 4. Slide from right ──
    gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
      gsap.to(el, {
        opacity: 1, x: 0,
        duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // ── 5. Images: pop in on load ──
    Array.from(document.querySelectorAll<HTMLImageElement>("img.image-zoom")).forEach((img) => {
      if (img.complete) {
        gsap.set(img, { scale: 1, opacity: 1, filter: "blur(0px)" });
      } else {
        img.addEventListener("load", () => {
          gsap.fromTo(
            img,
            { scale: 0.995, opacity: 0, filter: "blur(6px)" },
            { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" }
          );
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

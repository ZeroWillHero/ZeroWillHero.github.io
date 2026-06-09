"use client";

import { useEffect } from "react";

export default function RevealObserver() {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.classList.add("in-view");
                        // unobserve to avoid repeated work
                        obs.unobserve(el);
                    }
                });
            },
            { threshold: 0.15 }
        );

        els.forEach((el, i) => {
            // add tiny stagger via inline style if not provided
            if (!el.style.transitionDelay) {
                el.style.transitionDelay = `${Math.min(200, i * 60)}ms`;
            }
            obs.observe(el);
        });

        return () => obs.disconnect();
    }, []);

    return null;
}

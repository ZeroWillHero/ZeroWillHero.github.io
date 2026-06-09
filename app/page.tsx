import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { NavBar } from "@/app/components/NavBar";
import GsapReveal from "@/app/components/GsapReveal";
import ContactSection from "@/app/components/ContactSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import contactData from "@/data/contact.json";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="p-2 min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white animate-page-fade-in">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-end overflow-hidden px-4">

        {/* ─── Desktop layout (768px +) ─── */}

        {/* Large background "Chameera" */}
        <h1
          className={`${bebasNeue.className} hidden md:block absolute pointer-events-none top-[10%] z-20 w-full text-center font-normal leading-none text-orange-500 md:text-[18rem] lg:z-0 lg:text-[22rem] animate-float-slow reveal dissolve`}
        >
          Chameera
        </h1>

        {/* Foreground "Sandakelum" */}
        <h1
          className={`${bebasNeue.className} hidden md:block absolute pointer-events-none top-[58%] z-20 w-full text-center font-normal text-white md:text-[8rem] lg:text-[9rem] animate-float-slower reveal dissolve`}
        >
          Sandakelum
        </h1>

        {/* Bio paragraph */}
        <p
          className="hidden md:block absolute top-[80%] z-30 w-[38%] text-center text-sm reveal dissolve"
          style={{ transitionDelay: "160ms" }}
        >
          Hi, I am{" "}
          <span className="text-orange-400">Chameera Sandakelum.</span>
          <br />
          Undergraduate student from Uva Wellassa University.
          <br />
          With 2 years of experience in backend development and mobile app
          development, I build modern applications.
        </p>

        {/* ─── Mobile layout (< 768px) ─── */}
        <div className="md:hidden absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1
            className={`${bebasNeue.className} text-orange-500 leading-none`}
            style={{ fontSize: "clamp(3rem, 18vw, 4.5rem)" }}
          >
            Chameera
          </h1>
          <h1
            className={`${bebasNeue.className} text-white leading-none mb-5`}
            style={{ fontSize: "clamp(3rem, 18vw, 4.5rem)" }}
          >
            Sandakelum
          </h1>
          <p className="text-zinc-300 text-xs leading-relaxed max-w-[260px]">
            Hi, I am{" "}
            <span className="text-orange-400">Chameera Sandakelum.</span>
            {" "}Undergraduate at Uva Wellassa University with 2 years of
            backend &amp; mobile development experience.
          </p>
        </div>

        <NavBar />

        <Image
          src="/Chameera.png"
          alt="Chameera"
          width={768}
          height={1024}
          priority
          className="hidden md:block z-0 md:h-[80vh] w-auto max-w-[95vw] self-center object-contain object-center image-zoom reveal dissolve"
          style={{ transitionDelay: "220ms" }}
        />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="projects"
        className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-16 md:py-24"
      >
        <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-zinc-700/60 to-transparent" />
        <ProjectsSection />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="contact"
        className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-16 md:py-24"
      >
        <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-zinc-700/60 to-transparent" />
        <ContactSection contact={contactData} />
        <p className="mt-16 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} Chameera Sandakelum. Built with Next.js &amp; Tailwind CSS.
        </p>
      </section>
      <GsapReveal />
    </main>
  );
}

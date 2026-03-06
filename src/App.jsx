import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

function useTypeRotate(
  phrases,
  { typeMs = 55, pauseMs = 1200, deleteMs = 35 } = {},
) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = phrases[idx] ?? "";

  useEffect(() => {
    let t;

    if (!deleting && sub < current.length) {
      t = setTimeout(() => setSub((s) => s + 1), typeMs);
    } else if (!deleting && sub === current.length) {
      t = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && sub > 0) {
      t = setTimeout(() => setSub((s) => s - 1), deleteMs);
    } else if (deleting && sub === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(t);
  }, [phrases, idx, sub, deleting, current, typeMs, pauseMs, deleteMs]);

  return current.slice(0, sub);
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function ProjectCard({
  title,
  desc,
  tech,
  image,
  links = {},
  featured = false,
}) {
  return (
    <div
      className={[
        "group overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur transition-all duration-300",
        "hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl",
        featured ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      {image && (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition" />
        </div>
      )}

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {featured && (
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Featured{" "}
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition">{title}
            </h3>
          </div>

          <div className="flex gap-3 text-sm">
            {links.live && (
              <a
                className="text-blue-600 hover:underline"
                href={links.live}
                target="_blank"
                rel="noreferrer"
              >
                Live
              </a>
            )}
            {links.code && (
              <a
                className="text-blue-600 hover:underline"
                href={links.code}
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
            )}
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-700">{desc}</p>

        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function App() {
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

  const phrases = useMemo(
    () => [
      "Full-Stack Software Engineer",
      "React + FastAPI Builder",
      "I ship end-to-end products",
    ],
    [],
  );
  const typed = useTypeRotate(phrases);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Soft background flair */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-[380px] w-[380px] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute right-[-140px] top-[140px] h-[420px] w-[420px] rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <header className="mx-auto max-w-5xl px-6 py-6">
        <nav className="flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            Home<span className="text-blue-600"></span>
          </a>
          <div className="flex items-center gap-5 text-sm text-slate-700">
            <a className="hover:text-blue-600" href="#projects">
              Projects
            </a>
            <a className="hover:text-blue-600" href="#skills">
              Skills
            </a>
            <a className="hover:text-blue-600" href="#contact">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6 pb-20">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/60">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/hero.jpg)" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/55 to-slate-900/75" />

          {/* Content */}
          <div className="relative px-8 py-14 sm:px-12" data-reveal>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Hamzah Muhammad
            </h1>

            <div className="mt-3 text-lg text-white/80">
              <span className="mr-2">{"{"}</span>
              <span className="font-mono text-white">{typed}</span>
              <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-blue-400 align-middle" />
              <span className="ml-2">{"}"}</span>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              I build practical, clean web apps from backend APIs to frontend
              UI. Currently showcasing:
              <span className="font-medium text-white">
                {" "}
                Symptom Checker
              </span>, <span className="font-medium text-white">Boo-Do</span>,
              and <span className="font-medium text-white">Monch</span>.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                href="#projects"
              >
                View Projects
              </a>

              <a
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                href="/resume.pdf"
              >
                Resume
              </a>

              <a
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                href="https://github.com/HamzahJoestar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                GitHub
              </a>

              <a
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                href="https://www.linkedin.com/in/hamzah-ali-muhammad/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                href="https://devpost.com/muhammadh31"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
                Devpost
              </a>

              <a
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                href="mailto:hamzahmuhammad1000@gmail.com"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="projects" className="mt-16">
          <div className="flex items-end justify-between gap-4" data-reveal>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500"></div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Things I’ve Built
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                A few projects that show how I build and ship.
              </p>
            </div>
          </div>

          {/* Featured */}
          <div className="mt-6" data-reveal>
            <ProjectCard
              featured
              image="/uvent.png"
              title="UVent"
              desc="Campus events dashboard with filtering and search. Built as a software engineering project with reusable React UI components."
              tech={["React", "Dashboard UI", "Filters/Search", "Team Project"]}
              links={{
                live: "https://kcalle012.github.io/Software-Engineering-Project/",
                code: "https://github.com/saaladdin/Software-Engineering-Project",
              }}
            />
          </div>

          {/* Grid */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2" data-reveal>
            <ProjectCard
              image="/symptom-checker.png"
              title="Symptom Checker"
              desc="AI-powered symptom analysis with structured severity + confidence scoring using a React UI and FastAPI backend."
              tech={["React", "FastAPI", "Python", "LLM", "JSON"]}
              links={{
                code: "https://github.com/HamzahJoestar/symptom-checker",
              }}
            />

            <ProjectCard
              image="/boo-do.png"
              title="Boo-Do"
              desc="Kanban-style productivity app with AI-assisted suggestions, built with React and FastAPI."
              tech={["React", "Vite", "Tailwind", "UX"]}
              links={{
                code: "https://github.com/HamzahJoestar/kanban-ghost",
              }}
            />

            <ProjectCard
              image="/monch.png"
              title="Monch.club"
              desc="Recipe discovery app with category filtering and search built during HackRU."
              tech={["Flask", "Python", "Web UI", "Hackathon Winner"]}
              links={{
                code: "https://github.com/HamzahJoestar/yummyhackyr24",
              }}
            />
            <ProjectCard
              image="/qare.png"
              title="Qare"
              desc="AI-powered mental health chatbot designed for LGBTQ+ communities. Built with React, SCSS, and a FastAPI backend with multi-turn GPT conversations."
              tech={["React", "FastAPI", "SCSS", "AI", "Hackathon Winner"]}
              links={{
                code: "https://github.com/zepion1/RTGHACK",
              }}
            />
          </div>

          {/* More link */}
          <div className="mt-6" data-reveal>
            <a
              className="text-sm font-semibold text-blue-600 hover:underline"
              href="https://github.com/HamzahJoestar"
              target="_blank"
              rel="noopener noreferrer"
            >
              See more on GitHub →
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-16">
          <div
            className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6"
            data-reveal
          >
            <h2 className="text-2xl font-semibold tracking-tight">
              Skills & Tools
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Skills</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>Full-Stack Development</li>
                  <li>API Design</li>
                  <li>System Thinking</li>
                  <li>UI Implementation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Tools</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "React",
                    "FastAPI",
                    "Python",
                    "JavaScript",
                    "SQL",
                    "Git",
                    "Vercel",
                  ].map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16" data-reveal>
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur">
            <h2 className="text-2xl font-semibold tracking-tight">
              Let’s build something.
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Best way to reach me is email. I’m also on GitHub and LinkedIn.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                href="mailto:hamzahmuhammad1000@gmail.com"
              >
                <Mail size={18} />
                Email
              </a>

              <a
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-200"
                href="https://github.com/HamzahJoestar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-200"
                href="https://www.linkedin.com/in/hamzah-ali-muhammad/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-16 pb-4 text-center text-xs text-slate-500">
          Built with React + Tailwind • Deployed with care
        </footer>
      </main>

      {/* Reveal animation styles */}
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(10px); transition: opacity 500ms ease, transform 500ms ease; }
        .reveal-in { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </div>
  );
}

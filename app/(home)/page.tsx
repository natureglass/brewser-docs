import Link from 'next/link';
import { ArrowRight, Cpu, Plug, Rocket, Upload } from 'lucide-react';
import BrewserLogo from '@/assets/Brewser_logo_day_small.png';
import BrewserLogoNight from '@/assets/Brewser_logo_night_small_2.png';

const sections = [
  {
    title: 'Getting started',
    href: '/docs',
    icon: Rocket,
    description:
      'Install Brewser on your Switch and open your first app in minutes.',
  },
  {
    title: 'Publishing apps',
    href: '/docs/publishing',
    icon: Upload,
    description:
      'Submit through GitHub, pass the security scan, ship to the catalogue.',
  },
  {
    title: 'Web API support',
    href: '/docs/features',
    icon: Plug,
    description:
      'WebGL2, WebSerial, Bluetooth, MIDI — what works, side by side with Chromium.',
  },
  {
    title: 'Runtime internals',
    href: '/docs/runtime',
    icon: Cpu,
    description:
      'V8, Skia, and Mesa on Tegra X1 — how the engine actually works.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-[#e6e6f0] bg-white px-10 py-5 text-center shadow-[0_0_15px_0_rgba(0,0,0,0.06)] dark:border-fd-border dark:bg-fd-popover dark:shadow-[0_0_15px_0_rgba(0,0,0,0.35)]">
        <img
          src={BrewserLogo.src}
          alt="Brewser logo"
          width={BrewserLogo.width}
          height={BrewserLogo.height}
          className="mx-auto mb-6 h-28 w-auto dark:hidden"
        />
        <img
          src={BrewserLogoNight.src}
          alt="Brewser logo"
          width={BrewserLogoNight.width}
          height={BrewserLogoNight.height}
          className="mx-auto mb-6 hidden h-28 w-auto dark:block"
        />

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Brewser documentation
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-fd-muted-foreground">
          A web runtime for Nintendo Switch homebrew. Build with standard Web
          APIs — if it runs in Chrome, it runs on your Switch.
        </p>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-amber-400 px-5 py-2.5 font-medium text-amber-950 transition-colors hover:bg-amber-300"
          >
            Get started
          </Link>
          <Link
            href="/docs/publishing"
            className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            Publish your first app
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/*
          Drop a short hardware capture (a Three.js demo or Neon Serpent
          running on a real Switch) at public/media/switch-demo.mp4 and
          uncomment this block — it sells the project better than any copy:

        <video
          className="mx-auto mb-12 w-full max-w-xl rounded-xl border border-fd-border"
          src="/media/switch-demo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        */}

        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent/50"
            >
              <section.icon className="size-5 text-amber-600 dark:text-amber-400" />
              <p className="mb-1 mt-3 font-medium">{section.title}</p>
              <p className="text-sm text-fd-muted-foreground">
                {section.description}
              </p>
            </Link>
          ))}
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
          <a
            href="https://brewser.io"
            className="transition-colors hover:text-fd-foreground"
          >
            brewser.io
          </a>
          <a
            href="https://brewser.io/submit/"
            className="transition-colors hover:text-fd-foreground"
          >
            Submit an app
          </a>
          <a
            href="https://github.com/natureglass/Brewser-apps"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-fd-foreground"
          >
            Apps on GitHub
            <ArrowRight className="size-3.5 -rotate-45" />
          </a>
        </footer>
      </div>
    </main>
  );
}

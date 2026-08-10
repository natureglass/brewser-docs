import Link from 'next/link';
import BrewserLogo from '@/assets/Brewser_logo.png';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <img
        src={BrewserLogo.src}
        alt="Brewser logo"
        width={BrewserLogo.width}
        height={BrewserLogo.height}
        className="mx-auto mb-6 h-32 w-auto rounded-[50%]"
      />
      <h1 className="text-3xl font-bold mb-4">Brewser Documentation</h1>
      <p className="mb-6">
        Brewser is an online platform for creators, tinkerers, and developers<br />
        a curiosity-driven playground for sharing your ideas and projects with the world.
      </p>
      <p>
        <Link
          href="/docs"
          className="inline-block rounded-lg bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground"
        >
          Open the Docs
        </Link>
      </p>
    </div>
  );
}

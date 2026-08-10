import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <h1 className="text-3xl font-bold mb-4">Brewser Documentation</h1>
      <p className="mb-6 text-fd-muted-foreground">
        Everything about the Brewser web runtime — how it works, how to build
        for it, and how to publish your apps.
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

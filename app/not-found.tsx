import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-24 md:px-10">
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">This page is not here.</h1>
      <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-muted">
        The address does not match a page on this site.
      </p>
      <Link href="/work" className="btn mt-8">
        Work
      </Link>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Enquiry",
  description: "Send Santhosh Architecture a note about a house, interior, or workplace.",
};

export default function EnquiryPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] items-start gap-8 px-4 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
      <div>
        <h1 className="max-w-[8ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Enquiry
        </h1>
        <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-muted">
          Write a short note. It stays in the browser until you email it to the studio.
        </p>
        <div className="shot relative mt-8 hidden aspect-[4/3] lg:block">
          <Image
            src="/images/reading-room.jpg"
            alt="Timber bookshelves, a wooden table, and a cushioned window seat in a quiet room."
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <EnquiryForm />
    </div>
  );
}

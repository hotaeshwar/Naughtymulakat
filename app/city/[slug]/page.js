import { redirect, notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ slug: "bangalore" }, { slug: "pune" }, { slug: "goa" }];
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  if (slug === "bangalore" || slug === "pune" || slug === "goa") {
    redirect(`/${slug}`);
  }
  notFound();
}

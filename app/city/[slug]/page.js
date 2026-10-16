import { redirect, notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ slug: "bangalore" }, { slug: "pune" }];
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  if (slug === "bangalore" || slug === "pune") {
    redirect(`/${slug}`);
  }
  notFound();
}

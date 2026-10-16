import { notFound } from "next/navigation";
import CityClientView from "../city/[slug]/CityClientView";
import { citiesData } from "../../data/seedData";

export async function generateStaticParams() {
  return [{ city: "bangalore" }, { city: "pune" }];
}

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const slug = cityParam?.toLowerCase();
  const city = citiesData.find((c) => c.slug === slug);

  if (!city) {
    return {
      title: "City Not Found | Naughty Mulaqat",
    };
  }

  return {
    title: `${city.name} Escorts & VIP Companions | Naughty Mulaqat (18+)`,
    description: city.description,
    keywords: [
      `${city.name} escorts`,
      `VIP companions ${city.name}`,
      `call girls in ${city.name}`,
      `independent models ${city.name}`,
    ],
    openGraph: {
      title: `${city.name} Luxury Escorts & Elite Companions`,
      description: city.description,
      images: ["/images/nightlife-banner.png"],
    },
  };
}

export default async function TopLevelCityPage({ params }) {
  const { city: cityParam } = await params;
  const slug = cityParam?.toLowerCase();

  if (slug !== "bangalore" && slug !== "pune") {
    notFound();
  }

  const city = citiesData.find((c) => c.slug === slug);

  return <CityClientView initialCity={slug} cityInfo={city} />;
}

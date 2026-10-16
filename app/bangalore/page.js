import CityClientView from "../city/[slug]/CityClientView";
import { citiesData } from "../../data/seedData";

export const metadata = {
  title: "Bangalore Escorts & VIP Companions | Naughty Mulaqat (18+)",
  description:
    "Discover Bangalore's most enchanting, verified independent models and VIP companions in Indiranagar, Koramangala, Whitefield, and MG Road.",
  keywords: [
    "Bangalore escorts",
    "VIP companions Bangalore",
    "independent models Bangalore",
    "call girls Bangalore",
  ],
};

export default function BangalorePage() {
  const city = citiesData.find((c) => c.slug === "bangalore");
  return <CityClientView initialCity="bangalore" cityInfo={city} />;
}

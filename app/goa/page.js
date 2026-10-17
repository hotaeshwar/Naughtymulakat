import CityClientView from "../city/[slug]/CityClientView";
import { citiesData } from "../../data/seedData";

export const metadata = {
  title: "Goa Escorts & VIP Companions | Naughty Mulaqat (18+)",
  description:
    "Indulge in paradise with Goa's most enchanting, verified independent models and VIP companions in Calangute, Candolim, Panaji, and Anjuna.",
  keywords: [
    "Goa escorts",
    "VIP companions Goa",
    "independent models Goa",
    "call girls Goa",
    "Goa beach companions",
  ],
};

export default function GoaPage() {
  const city = citiesData.find((c) => c.slug === "goa");
  return <CityClientView initialCity="goa" cityInfo={city} />;
}

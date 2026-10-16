import CityClientView from "../city/[slug]/CityClientView";
import { citiesData } from "../../data/seedData";

export const metadata = {
  title: "Pune Escorts & VIP Companions | Naughty Mulaqat (18+)",
  description:
    "Experience world-class charm and passionate companionship with verified high-profile models in Koregaon Park, Kalyani Nagar, Baner, and Viman Nagar.",
  keywords: [
    "Pune escorts",
    "VIP companions Pune",
    "independent models Pune",
    "call girls Pune",
  ],
};

export default function PunePage() {
  const city = citiesData.find((c) => c.slug === "pune");
  return <CityClientView initialCity="pune" cityInfo={city} />;
}

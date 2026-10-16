import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { citiesData, categoriesData, ageRangesData, locationsData, profilesData } from "../data/seedData.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbsr0oPfofuHOvNJ_zqmClZA8L1QeOR6o",
  authDomain: "escort-7d56f.firebaseapp.com",
  projectId: "escort-7d56f",
  storageBucket: "escort-7d56f.firebasestorage.app",
  messagingSenderId: "39384089913",
  appId: "1:39384089913:web:c5e559330fbb2ed0d894e8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Starting Firestore Seeding for Adult Directory...");

  try {
    // 1. Seed Cities
    console.log(`Seeding ${citiesData.length} cities...`);
    for (const city of citiesData) {
      await setDoc(doc(db, "cities", city.id), city);
      console.log(`  - City: ${city.name}`);
    }

    // 2. Seed Categories
    console.log(`Seeding ${categoriesData.length} categories...`);
    for (const cat of categoriesData) {
      await setDoc(doc(db, "categories", cat.id), cat);
      console.log(`  - Category: ${cat.name}`);
    }

    // 3. Seed Age Ranges
    console.log(`Seeding ${ageRangesData.length} age ranges...`);
    for (const age of ageRangesData) {
      await setDoc(doc(db, "ageRanges", age.id), age);
      console.log(`  - Age Range: ${age.label}`);
    }

    // 4. Seed Locations
    console.log(`Seeding ${locationsData.length} locations...`);
    for (const loc of locationsData) {
      await setDoc(doc(db, "locations", loc.id), loc);
    }
    console.log(`  - Successfully seeded ${locationsData.length} locations`);

    // 5. Seed Profiles
    console.log(`Seeding ${profilesData.length} profiles...`);
    for (const profile of profilesData) {
      await setDoc(doc(db, "profiles", profile.id), profile);
      console.log(`  - Profile: ${profile.name} (${profile.cityName} - ${profile.category})`);
    }

    console.log("\nFirestore Seeding Completed Successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding Firestore:", error.message);
    console.error("Note: If permissions were denied, ensure Firestore rules allow read/write in test mode or with appropriate security rules.");
    process.exit(1);
  }
}

seed();

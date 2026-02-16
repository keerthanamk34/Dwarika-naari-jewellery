import jewelry1 from "@/assets/new image1.jpeg";
import jewelry2 from "@/assets/new image 2.jpeg";
import jewelry3 from "@/assets/new img3.jpeg";
import jewelry4 from "@/assets/new img 4.jpeg";
import jewelry5 from "@/assets/new img 5.jpeg";
import jewelry6 from "@/assets/new img 7.jpeg";
import jewelry7 from "@/assets/new img 8.jpeg";
import jewelry8 from "@/assets/new img 9.jpeg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  occasion: string;
  material: string;
  description: string;
  details: string;
  bestseller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Rajsi Pushpa Temple Necklace Set",
    price: 1999,
    originalPrice: 2999,
    rating: 4.2,
    reviews: 24,
    image: jewelry1,
    category: "Necklaces",
    occasion: "Festival",
    material: " Gold, Kundan, Pearls",
    description: "A traditional temple-inspired necklace adorned with ruby-toned stones, emerald accents, and delicate pearl drops, crafted to radiate royal South Indian elegance.",
    details: "Antique gold finish with ruby and emerald tone stones, pearl detailing, and matching earrings, perfect for weddings and festive wear.",
    bestseller: true,
  },
  {
    id: 2,
    name: "Rajwada Emerald Jewel",
    price: 6999,
    rating: 4.0,
    reviews: 65,
    image: jewelry2,
    category: "Necklace",
    occasion: "Festive",
    material: "Emerald, Pearls",
    description: "Featuring a striking emerald stone set in intricate antique gold craftsmanship, this pendant embodies heritage, grace, and royal charm.",
    details: "Antique gold temple-inspired pendant featuring a deep emerald teardrop stone with intricate micro-stone detailing, perfect for weddings and festive occasions.",
    bestseller: true,
  },
  {
    id: 3,
    name: "Amora Teardrop Layered Necklace Set",
    price: 8999,
    originalPrice: 11499,
    rating: 4.6,
    reviews: 156,
    image: jewelry3,
    category: "Necklace",
    occasion: "Festive",
    material: "Gold, pearls",
    description: "A delicate layered necklace adorned with shimmering teardrop crystals and a deep violet centerpiece, crafted to add graceful charm to festive and evening looks.",
    details: "Gold-tone layered necklace featuring crystal teardrop charms with a violet stone centerpiece and matching earrings, perfect for elegant occasions.",
  },
  {
    id: 4,
    name: "Swarna Crystal Regal Choker",
    price: 4999,
    rating: 4.6,
    reviews: 98,
    image: jewelry4,
    category: "Necklace",
    occasion: "Festival",
    material: " Gold, Citrine, Diamond",
    description: "An elegant gold-tone choker embellished with shimmering crystals in a majestic peacock-inspired design, perfect for statement evening wear..",
    details: "Gold-tone choker adorned with high-shine crystals and matching earrings, ideal for receptions and party occasions.",
    bestseller: true,
  },
  {
    id: 5,
    name: "Amethyst Aura Statement Necklace",
    price: 2999,
    rating: 4.5,
    reviews: 32,
    image: jewelry5,
    category: "Necklace",
    occasion: "Everyday",
    material: "Rose Gold",
    description: "A bold antique necklace featuring deep amethyst-toned stones framed with micro-crystal detailing, designed for modern royal sophistication",
    details: "Antique finish necklace featuring deep amethyst stones with micro-crystal accents and matching earrings for elegant evening wear",
  },
  {
    id: 6,
    name: "Rani Gulzar Bridal Necklace ",
    price: 5555 ,
    rating: 4.9,
    reviews: 67,
    image: jewelry6,
    category: "Necklaces",
    occasion: "Bridal",
    material: " 22k Gold plating, Natural Pearls",
    description: "A graceful layered necklace adorned with ruby-toned floral stones and delicate detailing, crafted to enhance bridal charm and feminine elegance..",
    details: "Floral ruby-toned layered necklace in gold polish with matching earrings, designed for bridal and festive elegance.",
    bestseller: true,
  },
  {
    id: 7,
    name: "Gulab Jhumka Earrings",
    price: 350,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 28,
    image: jewelry7,
    category: "Earrings",
    occasion: "Everyday",
    material: " Gold Plated Sterling Silver",
    description: "Elegant gold-tone jhumka earrings adorned with delicate stone detailing, designed to bring timeless festive charm and feminine grace to every look..",
    details: "Traditional gold-finish jhumka earrings with intricate stone work, perfect for festive, wedding, and ethnic occasions.",
  },
  {
    id: 8,
    name: "Triveni Antique Drop Chain",
    price: 750,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 45,
    image: jewelry8,
    category: "Necklace",
    occasion: "Casual",
    material: " Polki Diamonds",
    description: "Layered to perfection, This piece adds a subtle glow to every outfit",
    details: "A timeless triple-layer antique necklace that adds effortless royal elegance to any look",
  },
];

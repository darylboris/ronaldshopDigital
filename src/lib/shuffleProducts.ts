import { typeProduct } from "@/app/page";
import { typeGetImage } from "../../components/GetSliderImages";
export default function shuffleProducts(array:typeProduct[]) {
    // Copie du tableau pour éviter de modifier l'original
    const shuffleProducts = [...array];
    
    // Algorithme de Fisher-Yates
    for (let i = shuffleProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Index aléatoire entre 0 et i inclus
      [shuffleProducts[i], shuffleProducts[j]] = [shuffleProducts[j], shuffleProducts[i]]; // Échange des éléments
    }
    
    return shuffleProducts;
  }
  
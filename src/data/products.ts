export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const WHATSAPP_NUMBER = "554888808464";

// Ícones Lucide modernos e realistas
export const categories: Category[] = [
  { id: "perfumes", name: "Perfumes", icon: "droplets" },
  { id: "maquiagem", name: "Maquiagem", icon: "brush" },
  { id: "skincare", name: "Skincare", icon: "heart" },
  { id: "cabelos", name: "Cabelos", icon: "sparkles" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Perfume Floral Rose",
    price: 129.90,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop",
    category: "perfumes",
    description: "Fragrância floral delicada com notas de rosa e jasmim",
  },
  {
    id: "2",
    name: "Eau de Parfum Luxe",
    price: 189.90,
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
    category: "perfumes",
    description: "Perfume sofisticado com notas amadeiradas e frutadas",
  },
  {
    id: "3",
    name: "Perfume Feminino Sweet",
    price: 99.90,
    imageUrl: "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=400&h=400&fit=crop",
    category: "perfumes",
    description: "Aroma doce e envolvente, perfeito para o dia a dia",
  },
  {
    id: "4",
    name: "Batom Matte Vermelho",
    price: 39.90,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4e6232bf9577?w=400&h=400&fit=crop",
    category: "maquiagem",
    description: "Batom de longa duração com acabamento matte",
  },
  {
    id: "5",
    name: "Base Facial HD",
    price: 69.90,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    category: "maquiagem",
    description: "Base de alta cobertura com efeito pele perfeita",
  },
  {
    id: "6",
    name: "Paleta de Sombras",
    price: 89.90,
    imageUrl: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&h=400&fit=crop",
    category: "maquiagem",
    description: "Paleta com 12 tons que vão do nude ao dramático",
  },
  {
    id: "7",
    name: "Sérum Vitamina C",
    price: 79.90,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    category: "skincare",
    description: "Sérum clareador e antioxidante com vitamina C estabilizada",
  },
  {
    id: "8",
    name: "Hidratante Facial",
    price: 59.90,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    category: "skincare",
    description: "Hidratante leve com FPS 30 para uso diário",
  },
  {
    id: "9",
    name: "Body Cream Nutritivo",
    price: 49.90,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    category: "skincare",
    description: "Creme corporal ultra nutritivo com manteiga de karité",
  },
  {
    id: "10",
    name: "Shampoo Hidratante",
    price: 44.90,
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    category: "cabelos",
    description: "Shampoo para cabelos secos e danificados",
  },
  {
    id: "11",
    name: "Máscara Capilar",
    price: 55.90,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    category: "cabelos",
    description: "Tratamento intensivo de hidratação para cabelos",
  },
  {
    id: "12",
    name: "Óleo Capilar",
    price: 64.90,
    imageUrl: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop",
    category: "cabelos",
    description: "Óleo finalizador para brilho e maciez extremos",
  },
];

export function buildWhatsAppLink(product: Product): string {
  const message = `Olá, tenho interesse neste produto:\n\nNome: ${product.name}\nPreço: R$ ${product.price.toFixed(2).replace(".", ",")}\nImagem: ${product.imageUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

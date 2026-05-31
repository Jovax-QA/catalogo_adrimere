export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  externalImageUrl?: string;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const WHATSAPP_NUMBER = "554898025421";

// Ícones Lucide modernos e realistas
export const categories: Category[] = [
  { id: "perfumes", name: "Perfumes", icon: "droplets" },
  { id: "skincare", name: "Skincare", icon: "heart" },
  { id: "cabelos", name: "Cabelos", icon: "sparkles" },
  { id: "cuidados-pessoais", name: "Cuidados Pessoais", icon: "package" },
  { id: "sabonetes", name: "Sabonetes", icon: "droplets" },
  { id: "desodorantes", name: "Desodorantes", icon: "wind" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Vitamina C Ácido Hialurônico Anti-idade",
    price: 0,
    imageUrl: "/products/vitamina-c-anti-idade.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/vitamina-c-anti-idade_che94n.png",
    category: "skincare",
    description: "Sérum facial com Vitamina C e Ácido Hialurônico para ação anti-idade",
  },
  {
    id: "2",
    name: "Sabonete Íntimo",
    price: 0,
    imageUrl: "/products/sabonete-intimo.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/sabonete-intimo_nymupv.png",
    category: "sabonetes",
    description: "Sabonete íntimo para higiene diária",
  },
  {
    id: "3",
    name: "Colônia",
    price: 0,
    imageUrl: "/products/colonia.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/colonia_ccvc97.png",
    category: "perfumes",
    description: "Colônia refrescante para uso diário",
  },
  {
    id: "4",
    name: "Body Splash",
    price: 0,
    imageUrl: "/products/body-splash.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/body-splash_hyxrzv",
    category: "perfumes",
    description: "Body Splash com fragrância suave e duradoura",
  },
  {
    id: "5",
    name: "Perfume",
    price: 0,
    imageUrl: "/products/perfume.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/perfume_uussub.png",
    category: "perfumes",
    description: "Perfume com fragrância elegante e sofisticada",
  },
  {
    id: "6",
    name: "Perfume Masculino e Feminino",
    price: 0,
    imageUrl: "/products/perfume-masculino-feminino.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/perfume_uussub.png",
    category: "perfumes",
    description: "Perfume disponível em versões masculina e feminina",
  },
  {
    id: "7",
    name: "Creme Depilatório",
    price: 0,
    imageUrl: "/products/creme-depilatorio.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/creme-depilatorio_tjosph.png",
    category: "cuidados-pessoais",
    description: "Creme depilatório para remoção de pelos",
  },
  {
    id: "8",
    name: "Creme para Mãos",
    price: 0,
    imageUrl: "/products/creme-maos.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/creme-maos_feprgu.png",
    category: "cuidados-pessoais",
    description: "Creme hidratante para as mãos",
  },
  {
    id: "9",
    name: "Desodorante",
    price: 0,
    imageUrl: "/products/desodorante.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/desodorante_emklpb.png",
    category: "desodorantes",
    description: "Desodorante com proteção prolongada",
  },
  {
    id: "10",
    name: "Desodorante",
    price: 0,
    imageUrl: "/products/desodorante-2.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/desodorante_emklpb.png",
    category: "desodorantes",
    description: "Desodorante com proteção prolongada",
  },
  {
    id: "11",
    name: "Shampoo, Condicionador e Máscara",
    price: 0,
    imageUrl: "/products/shampoo-condicionador-mascara.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/shampoo-condicionador-mascara_hm9wdt.png",
    category: "cabelos",
    description: "Kit completo para tratamento capilar",
  },
  {
    id: "12",
    name: "Hidratante Corporal",
    price: 0,
    imageUrl: "/products/hidratante-corporal.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/hidratante-corporal_up3q4r.png",
    category: "cuidados-pessoais",
    description: "Hidratante corporal para pele macia e hidratada",
  },
  {
    id: "13",
    name: "Hidratante Corporal Masculino/Feminino",
    price: 0,
    imageUrl: "/products/hidratante-corporal-masculino-feminino.jpg",
    externalImageUrl: "https://res.cloudinary.com/dsitobdp2/image/upload/f_auto/q_auto/hidratante-corporal-masculino-feminino_pmi5zk.png",
    category: "cuidados-pessoais",
    description: "Hidratante corporal disponível em versões masculina e feminina",
  },
];

export function buildWhatsAppLink(product: Product): string {
  const imageUrl = product.externalImageUrl || product.imageUrl;
  const message = `Olá, tenho interesse em saber mais sobre o produto\n\nNome: ${product.name}\nImagem: ${imageUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

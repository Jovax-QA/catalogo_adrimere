import { useState } from "react";
import { categories, products } from "@/data/products";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Droplets, Brush, Heart, Sparkles, CreditCard, X, QrCode, Wallet, Banknote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mapeamento de ícones modernos e realistas
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  brush: Brush,
  heart: Heart,
  sparkles: Sparkles,
};

// Componente para renderizar ícone da categoria
function CategoryIcon({ icon, className = "w-5 h-5" }: { icon: string; className?: string }) {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent className={className} /> : null;
}

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filtered = products.filter((p) => p.category === activeCategory);
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Fixa à Esquerda - Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-200 p-6 overflow-y-auto z-50">
        {/* Perfil AdriMere */}
        <div className="text-center mb-10">
          <img
            src="/logo.jpeg"
            alt="AdriMere"
            className="w-full h-auto max-h-64 object-contain rounded-3xl shadow-lg mx-auto"
            style={{ imageRendering: 'auto', WebkitBackfaceVisibility: 'hidden' }}
          />
        </div>

        {/* Menu de Categorias Vertical com Ícones */}
        <nav className="space-y-3">
          <div className="flex items-center gap-2 mb-4 px-3">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Categorias
            </p>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeCategory === cat.id
                  ? "bg-rose-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CategoryIcon 
                icon={cat.icon} 
                className={activeCategory === cat.id ? "w-5 h-5" : "w-5 h-5 text-gray-500"} 
              />
              <span>{cat.name}</span>
              {activeCategory === cat.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </nav>

        {/* Menu Formas de Pagamento */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all text-left">
                <CreditCard className="w-5 h-5" />
                <span>Formas de Pagamento</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                  Formas de Pagamento
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <QrCode className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">PIX</p>
                    <p className="text-sm text-gray-600">Pagamento instantâneo 24h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Cartão de Crédito</p>
                    <p className="text-sm text-gray-600">Parcelado em até 12x</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <Wallet className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Cartão de Débito</p>
                    <p className="text-sm text-gray-600">Direto na conta</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <Banknote className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Dinheiro</p>
                    <p className="text-sm text-gray-600">Pagamento na entrega</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Entre em contato pelo WhatsApp para mais informações
              </p>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Card na Sidebar */}
        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="font-medium text-green-800 text-sm">Compre pelo WhatsApp</span>
          </div>
          <p className="text-xs text-green-600">
            Clique em qualquer produto para falar comigo!
          </p>
        </div>
      </aside>

      {/* Mobile Header - apenas navegação horizontal */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 lg:hidden">
        <div className="px-4 py-3">
          <nav className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CategoryIcon icon={cat.icon} className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content - com margin-left para desktop */}
      <main className="lg:ml-72 min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{ backgroundImage: "url('/ChatGPT Image 19 de abr. de 2026, 02_13_14.png')" }}
        />
        {/* Overlay branco semi-transparente */}
        <div className="absolute inset-0 bg-white/80" />
        
        {/* Conteúdo */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 min-h-screen flex flex-col">
        {/* Perfil Mobile */}
        <div className="lg:hidden flex items-center gap-4 mb-6">
          <img
            src="/logo.jpeg"
            alt="AdriMere"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-100"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-900">AdriMere</h1>
            <p className="text-sm text-gray-500">Produtos de Beleza</p>
          </div>
        </div>

        {/* Section Header com Ícone */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {activeCat && <CategoryIcon icon={activeCat.icon} className="w-8 h-8 text-rose-500" />}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{activeCat?.name}</h2>
              <p className="text-sm text-gray-500">{filtered.length} produtos</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-xl transition-all border border-amber-200">
                <CreditCard className="w-4 h-4" />
                <span>Consultar Formas de Pagamento</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                  Formas de Pagamento
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <QrCode className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">PIX</p>
                    <p className="text-sm text-gray-600">Pagamento instantâneo 24h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Cartão de Crédito</p>
                    <p className="text-sm text-gray-600">Parcelado em até 12x</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <Wallet className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Cartão de Débito</p>
                    <p className="text-sm text-gray-600">Direto na conta</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <Banknote className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Dinheiro</p>
                    <p className="text-sm text-gray-600">Pagamento na entrega</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Entre em contato pelo WhatsApp para mais informações
              </p>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products - Centralizado na tela */}
        <div className="flex-1 flex items-center justify-center">
          <ProductCarousel products={filtered} />
        </div>

        {/* Info Card Mobile */}
        <div className="lg:hidden mt-8 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="font-medium text-gray-900 text-sm">Compre pelo WhatsApp</span>
          </div>
          <p className="text-sm text-gray-500">
            Clique em qualquer produto para falar com a <span className="font-medium text-gray-700">AdriMere</span>.
          </p>
        </div>
        </div>
      </main>
    </div>
  );
}

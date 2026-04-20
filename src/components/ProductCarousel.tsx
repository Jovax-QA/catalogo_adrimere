import { useRef, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Componente de Tooltip customizado rápido
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShow(true);
        setTimeout(() => setShow(false), 2000);
      }}
    >
      {children}
      {show && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg pointer-events-none text-center"
          style={{ zIndex: 9999, width: 'max-content', maxWidth: '250px', whiteSpace: 'normal' }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
}

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
        Nenhum produto nesta categoria ainda.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2">
        <Tooltip text={canScrollLeft ? "Ver produtos anteriores" : "Você já está no início da lista"}>
          <button
            onClick={() => scroll("left")}
            className="bg-white shadow-lg border border-pink-100 rounded-full p-2 text-pink-500 hover:bg-pink-50 transition-colors hidden sm:flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Anterior"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-wrap gap-4 pb-3 justify-center"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2">
        <Tooltip text={canScrollRight ? "Ver mais produtos" : "Estes são todos os produtos disponíveis nesta categoria"}>
          <button
            onClick={() => scroll("right")}
            className="bg-white shadow-lg border border-pink-100 rounded-full p-2 text-pink-500 hover:bg-pink-50 transition-colors hidden sm:flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Próximo"
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

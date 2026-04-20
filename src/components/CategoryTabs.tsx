import { Category } from "@/data/products";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeCategory === cat.id
              ? "bg-pink-500 text-white shadow-md shadow-pink-200"
              : "bg-white text-gray-600 border border-pink-100 hover:border-pink-300 hover:text-pink-500"
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

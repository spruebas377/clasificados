// components/categories/CategoriesGrid.jsx
import CategoryCard from "./CategoryCard";

// IDs de categorías para adultos (actualiza con el ID real)
const ADULT_CATEGORY_IDS = [16]; // Cambia 8 por el ID de "Servicios +18"

export default function CategoriesGrid({ categories, onSelect }) {
  return (
    <div className="categories-grid" id="mainCategoriesGrid">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          icon={cat.icono}
          name={cat.nombre}
          onClick={() => onSelect(cat.id)}
          isAdultCategory={ADULT_CATEGORY_IDS.includes(cat.id)}
        />
      ))}
    </div>
  );
}

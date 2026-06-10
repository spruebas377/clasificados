// components/categories/CategoryCard.jsx
import { memo } from "react";

function CategoryCard({ icon, name, onClick, isAdultCategory = false }) {
  return (
    <div
      className="category-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={
        isAdultCategory
          ? {
              border: "2px solid #f59e0b",
              background:
                "linear-gradient(135deg, var(--surface) 0%, rgba(245, 158, 11, 0.05) 100%)",
            }
          : {}
      }
    >
      <i className={`fas ${icon || "fa-tag"}`}></i>
      <span>{name}</span>
      {isAdultCategory && (
        <span
          style={{
            fontSize: "0.7rem",
            background: "#f59e0b",
            color: "white",
            padding: "0.2rem 0.4rem",
            borderRadius: "20px",
            marginLeft: "0.5rem",
          }}
        >
          +18
        </span>
      )}
    </div>
  );
}

export default memo(CategoryCard);

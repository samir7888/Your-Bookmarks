"use client";
import React from "react";
import CategorySelector from "../CategorySelector";
import { CategoryType } from "@/types/category-type";

const CategorySection = ({ initialCategories }: { initialCategories: any }) => {
  const [categories, setCategories] =
    React.useState<CategoryType[]>(initialCategories);

  return (
    <div className="flex flex-col container mx-auto mb-4">
      <h1 className="text-2xl mb-4 font-bold text-center">Your Categories</h1>
      <CategorySelector
        onNewCategory={(category: CategoryType) =>
          setCategories((prev) => [...prev, category])
        }
      />
      <div className="flex flex-col py-5 gap-2">
        {categories.map((category: CategoryType) => (
          <li key={category.id} className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">
              {category.name}
            </span>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={() => {
                const res = fetch(`/api/v1/category/${category.id}`, {
                  method: "DELETE",
                });
                res
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    setCategories(data);
                  });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

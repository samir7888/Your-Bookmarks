"use client";
import React from "react";
import CategorySelector from "../CategorySelector";
import { CategoryType } from "@/types/category-type";

const CategorySection = ({ initialCategories }: { initialCategories: any }) => {
  const [categories, setCategories] = React.useState<CategoryType[]>(initialCategories);

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
          <li className="text-gray-700">{category.name}</li>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

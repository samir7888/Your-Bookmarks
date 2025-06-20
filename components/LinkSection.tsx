"use client";

import React, { useState } from "react";
import Link from "next/link";
import LinkForm from "./form/link-form";
import { LinkType } from "@/types/links-type";
import { CategoryType } from "@/types/category-type";

const LinkSection = ({
  categories,
  initialLinks,
}: {
  categories: CategoryType[];
  initialLinks: LinkType[] | [];
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div className="flex flex-col container mx-auto mb-4">
      <h1 className="text-2xl font-bold text-center">Your Links</h1>

      {/* Form */}
      <LinkForm
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        categories={categories}
        onNewLink={(link) => setLinks((prev) => [...prev, link])}
      />

      {/* List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link key={link.id} href={link.url} target="_blank">
            <div className="bg-white h-auto p-4 rounded-lg shadow border border-gray-200">
              <h1 className="capitalize text-lg font-semibold text-blue-600 hover:underline">
                {link.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {link?.notes}
              </p>
              <p className="text-xs mt-2 text-gray-400">
                Category: {link.category?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinkSection;

"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useSession } from "next-auth/react";

const CategorySelector = ({
  onNewCategory,
}: {
  onNewCategory: (category: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Category name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onsubmit = async (data: any) => {
    const payload = {
      ...data,
      userId: session?.data?.user?.id,
    };

    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const newCategory = await res.json();
      onNewCategory(newCategory);
      form.setValue("name", "");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Submitting..." : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default CategorySelector;

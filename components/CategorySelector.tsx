"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { useSession } from "next-auth/react";

const CategorySelector = ({
  onNewCategory,
}: {
  onNewCategory: (category: any) => void;
}) => {
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CategorySelector;

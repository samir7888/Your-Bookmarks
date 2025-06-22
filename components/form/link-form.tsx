"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/types/category-type";
import { useSession } from "next-auth/react";

const LinkForm = ({
  isOpen,
  setIsOpen,
  categories,
  onNewLink,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: any;
  onNewLink: (link: any) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="default">Add Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your Bookmark</DialogTitle>

          <FormComponent
            onOpenChange={setIsOpen}
            categories={categories}
            onNewLink={onNewLink}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LinkForm;

function FormComponent({
  onOpenChange,
  categories,
  onNewLink,
}: {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  categories: any;
  onNewLink: (link: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title must be at least 3 characters.",
    }),
    category: z.string().min(2, {
      message: "Category must be at least 2 characters.",
    }),
    url: z
      .string()
      .min(2, {
        message: "URL must be at least 2 characters.",
      })
      .url(),
    notes: z
      .string()
      .min(2, {
        message: "Notes must be at least 4 characters.",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      notes: "",
      category: "",
    },
  });

  const onsubmit = async (data: any) => {
    setIsLoading(true);
    const payload = {
      ...data,
      userId: session?.data?.user?.id,
    };
    const res = await fetch("/api/v1/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const newLink = await res.json();
    onNewLink(newLink);

    onOpenChange(false);
    setIsLoading(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl className="p-2 rounded-md">
                <select {...field}>
                  <option value="" disabled  hidden>
                    Select a category
                  </option>
                  {categories.map((category: CategoryType) => (
                    <option
                      className="p-2 capitalize"
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="url.." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="notes" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

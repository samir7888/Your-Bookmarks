"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
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
  const session = useSession();
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
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
    notes: z.string().min(2, {
      message: "Notes must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      notes: "",
      category: categories[0].id,
    },
  });

  const onsubmit = async (data: any) => {
    console.log(data);
    const payload = {
      ...data,
      userId: session?.data?.user?.id,
    };
    console.log(payload);
    const res = await fetch("/api/v1/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const newLink = await res.json();
    onNewLink(newLink);

    console.log(res);

    onOpenChange(false);
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                  {categories.map((category: CategoryType) => (
                    <option className="p-2" value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
              <FormDescription>
                This is your public display notes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

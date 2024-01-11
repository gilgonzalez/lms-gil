"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil, Ban, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  categoryId: z
    .string()
    .min(1)
});

interface Props {
  initialData: Course
  courseId: string;
  options: {label:string, value:string}[]
}

const CategoryForm = ({ courseId, initialData, options }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId ?? ""
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("Description changed successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong trying to change the title. Try again");
    }
  };
  const assignedCategory = options.find(option=> option.value === initialData.categoryId)
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-3">
      <div className="font-medium flex items-center justify-between">
        Category
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
              <X className="h-4 w-4 "/>
            </p>
            ) : (
              <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
              </>
              )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel title='cualquier cosa'/>
                  <FormControl>
                    <Combobox 
                      options={options}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {assignedCategory?.label ?? "No category assigned yet"}
        </p>
      )}
    </div>
  );
};
export default CategoryForm;

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
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

const MAX_DESCRIPTION = 500
const formSchema = z.object({
  price: z.coerce.number()
});

interface Props {
  initialData: Course
  courseId: string;
}

const PriceForm
 = ({ courseId, initialData }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price ?? undefined
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
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
            <X className="h-4 w-4 "/>
          </p>
            ) : (
              <>
              <Pencil className="h-4 w-4 mr-2" />
              Set price
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel title='cualquier cosa'/>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Set a price for the course"
                      disabled={isSubmitting}
                      type="number"
                      step={0.1}
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
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price): "No price setted"}
        </p>
      )}
    </div>
  );
};
export default PriceForm
;

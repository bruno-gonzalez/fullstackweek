"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { SearchIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const formSchema = z.object({
    search: z
      .string({ message: "O nome é obrigatório" })
      .trim()
      .min(1, "O nome deve ter no mínimo 1 caracteres"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${values.search}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full m-0">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Busque por uma barbearia..."
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"default"} size="icon">
            <SearchIcon size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignIn } from "@/components/signIn";
import Image from "next/image";
import axios from "../../../axios";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function ProfileForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      console.log("response", response);

      if (response.status === 200) {
        const { avatar, email, name, message } = response.data;
        setUser(avatar, email, name);
        toast({
          title: message,
        });
      }
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast({
          title: error.response.data.message,
          variant: "destructive",
        });
      } else {
        console.log("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col w-[500px] bg-white p-5 rounded-lg shadow-md">
      <Image
        src={"/trustwing.webp"}
        width={150}
        height={150}
        alt="Logo"
        className=""
      />
      <div className="lobster-font text-[25px] text-blue-500 tracking-[3px] font-bold pb-[40px]">
        EliCMS
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-[16px] font-bold hover:bg-blue-400"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-[5px]">
                <Spinner /> Logging In
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className="py-[20px] text-sm flex items-center w-full">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-2">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <div className="flex flex-col w-full">
        <SignIn />
      </div>
    </div>
  );
}

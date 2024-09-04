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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getLoggedInUser, Login } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export const dynamic = 'force-dynamic'

export default function SignIn() {

  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true)
    const response = await Login({ email: data.email, password: data.password })

    if (response) {
      router.push("/")
    }
    setLoading(false)
  }

  const getLoggedIn = async () => {
    const response = await getLoggedInUser();
    if (response) {
      router.push("/")
    }
  }

  useEffect(() => {
    getLoggedIn()
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm p-3 mx-auto"
      >
        <h1 className="font-bold text-2xl mb-3">Sign In</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="py-2 text-sm">
          <Link href="/reset-password">Forget Password</Link>
        </p>

        <Button disabled={loading} className="my-5 w-full" type="submit">
          {loading ? (
            <div className="flex gap-2">
              <Loader2
                size={20}
                className="animate-spin"
              />
              Loading...
            </div>
          ) : "Sign In"}
        </Button>

        <p>
          Don't have account? <Link href="/sign-up">Create account</Link>
        </p>
      </form>
    </Form>
  );
}

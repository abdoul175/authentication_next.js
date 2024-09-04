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
import { accountVerification, emailVerification, getLoggedInUser, Register } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { EMAIL_VERIFICATION_URL } from "@/constants";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).trim(),
});

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true)
    const response = await Register(data)
    // if (response) {
    //   await accountVerification(EMAIL_VERIFICATION_URL)
    // }
    router.push("/")
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
        <h1 className="font-bold text-2xl mb-3">Sign Up</h1>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button disabled={loading} className="my-5 w-full" type="submit">
          {loading ? (
            <div className="flex gap-2">
              <Loader2
                size={20}
                className="animate-spin"
              />
              Loading...
            </div>
          ) : "Sign Up"}
        </Button>

        <p>
          Already have account? <Link href="/sign-in">Sign In</Link>
        </p>
      </form>
    </Form>
  );
}

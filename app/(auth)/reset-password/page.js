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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/lib/actions/user.actions";
import { PASSWORD_RESET_URL } from "@/constants";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
});

export const dynamic = 'force-dynamic'

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true)
    const response = await resetPassword(data.email, PASSWORD_RESET_URL)
    if (response) {
      // console.log(response);
      // router.push(`/change-password?userId=${response.userId}&secret=${response.secret}`)
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm p-3 mx-auto"
      >
        <h1 className="font-bold text-2xl mb-3">Reset your password</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
              Sending...
            </div>
          ) : "Send"}
        </Button>

        <p>
          Go to <Link href="/sign-in">Sign in</Link>
        </p>
      </form>
    </Form>
  );
}

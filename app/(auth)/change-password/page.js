"use client"

import { useRouter, useSearchParams } from "next/navigation"
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
import { Loader2 } from "lucide-react";
import { useState } from "react"
import { changeAccountPassword } from "@/lib/actions/user.actions";

const formSchema = z.object({
    newPassword: z.string().min(4, {
        message: "Password must be at least 8 characters.",
    }).trim(),
    confirmPassword: z.string().min(4, {
        message: "Password must be at least 8 characters.",
    }).trim(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const dynamic = 'force-dynamic'

function ChangePassword() {
    const router = useRouter();

    const params = useSearchParams();
    const userId = params.get('userId')
    const secret = params.get('secret')

    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data) {
        data.userId = userId;
        data.secret = secret;
        setLoading(true)
        const response = await changeAccountPassword(data)
        if (response) {
            router.push("/sign-in")
        }
        setLoading(false);
    }

    return (
        <div><Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-sm p-3 mx-auto"
            >
                <h1 className="font-bold text-2xl mb-3">Change your password</h1>

                <div className="mb-3">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type placeholder="Enter your new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm your password" {...field} />
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
                            Submitting...
                        </div>
                    ) : "Submit"}
                </Button>

                <p>
                    Go to <Link href="/sign-in">Sign in</Link>
                </p>
            </form>
        </Form></div>
    )
}

export default ChangePassword
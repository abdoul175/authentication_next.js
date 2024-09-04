"use server"

import ButtonArea from "@/components/ButtonArea";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    redirect('/sign-in')
  }

  return (
    <div className="text-center h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome, {loggedInUser.name}</h1>
      <ButtonArea />
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2 ">
      <div className="flex flex-col gap-2">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <Button disabled={isPending} type="submit">
        Login
      </Button>
    </form>
  );
}

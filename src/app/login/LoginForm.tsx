"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/authInput";

/**
 * This form uses useActionState to call a server action for user login
 */
/**
 * About useActionSAtate()
 * Is a hook that allows to update state on the onSubmit action of a form.
 *
 * Parameters:
 *  fn: The function to be called when onSubmit, initially is given the
 *      initialState and afterwards the previous state.
 *  initialState: The value you want as an initialState.
 *
 * Returns:
 *  state: First is the initialState, then the value returned by the fn.
 *  fn:
 *  isPending: I pending transition flag.
 *
 * - With react server functions in NextJS the server's response from
 *   submitting the form will be shown even before hydration,
 *   without is the same as component local state.
 *
 * - The function passed to useActionState receives an extra argument,
 *   the previous or initial state, as its first argument.
 */
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

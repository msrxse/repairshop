"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

type LoginState =
  | {
      errors: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

const testUser = {
  id: "1",
  email: "user@nextmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

/**
 *
 * - The function passed to useActionState receives an extra argument,
 *   the previous or initial state, as its first argument. Its type should be
 *   the initial state plus the the returns of this fn.
 * - The result of this fn could be an object that includes a boolean indicating
 *   whether the action was successful, an error message, or updated information.
 *   In this case the have an error object set when errors, if success we create
 *   a session but otherwise return undefined
 */
export async function login(prevState: LoginState, formData: FormData) {
  // First we use Zod to validate the form data given out schema (loginSchema)
  // Zod is a TypeScript-first schema declaration and validation library.
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  /**
   * Here we are simulating a backend response to
   * error if the user is not the one we have hardcoded here
   */
  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        // ambiguous response anyway for security
        email: ["Invalid email or password"],
      },
    };
  }

  // Here we get a session stored in a cookie, meaning out user is not authenticated
  await createSession(testUser.id);

  redirect("/tickets");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

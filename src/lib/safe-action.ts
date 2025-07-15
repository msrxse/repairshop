import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { DrizzleQueryError } from "drizzle-orm/errors";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleServerError(e, utils) {
    // const { clientInput, metadata } = utils

    if (e instanceof DrizzleQueryError) {
      const cause = e.cause as { code?: string; detail?: string } | undefined;
      const code = cause?.code;
      const detail = cause?.detail;

      if (code === "23505") {
        // feedback displayed for user
        // Wont be reported to Sentry!
        return `Unique entry required. ${detail}`;
      }
    }

    // Sentry.captureException(e, (scope) => {
    //     scope.clear()
    //     scope.setContext('serverError', { message: e.message })
    //     scope.setContext('metadata', { actionName: metadata?.actionName })
    //     scope.setContext('clientInput', { clientInput })
    //     return scope
    // })

    if (e instanceof DrizzleQueryError) {
      return "Database Error: Your data did not save. Support will be notified.";
    }

    return e.message;
  },
});

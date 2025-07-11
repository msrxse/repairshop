import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleServerError(e: Error, utils) {
    // Sentry logging
    // const { clientInput, metadata } = utils;
    // Sentry.captureException(e, (scope) => {
    //   scope.clear();
    //   scope.setContext("serverError", { message: e.message });
    //   scope.setContext("metadata", { actionName: metadata?.actionName });
    //   scope.setContext("clientInput", { clientInput });
    //   return scope;
    // });

    if (e.constructor.name === "NeonDbError") {
      return "Database Error: Your data did not save. Support will be notified.";
    }

    return e.message;
  },
});

"use server";

import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { getKindeAuthAPI } from "@/app/lib/getKindeAuthAPI";

import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from "@/zod-schemas/ticket";

export const saveTicketAction = actionClient
  .metadata({
    actionName: "saveTicketAction",
  })
  .inputSchema(insertTicketSchema, {
    // Here we use the `flattenValidationErrors` function to customize the returned validation errors
    // object to the client.
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeAuthAPI();
      const auth = await isAuthenticated();

      if (!auth) redirect("/login");

      // New ticket
      if (ticket.id === 0) {
        // New Ticket
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({
            insertedId: tickets.id,
          });

        return {
          message: `Ticket ${result[0].insertedId} created successfully`,
        };
      }
      // Update existing ticket
      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          completed: ticket.completed,
          tech: ticket.tech,
        })
        .where(eq(tickets.id, ticket.id!))
        .returning({
          updatedId: tickets.id,
        });

      return {
        message: `Ticket ${result[0].updatedId} updated successfully`,
      };
    }
  );

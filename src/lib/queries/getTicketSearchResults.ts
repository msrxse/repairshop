import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { eq, ilike, or, sql, asc } from "drizzle-orm";

export async function getTicketSearchResults(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        // Custom sql handles both ilikes commented above
        // but also searches both at same time (search for firstName+lastName)
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE 
        ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(asc(tickets.createdAt));

  return results;
}

// Since this query mixes tables we dont have a specific type previously
export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;

import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getCustomerSearchResults(searchText: string) {
  if (!searchText) {
    return [];
  }

  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        // ilike(customers.firstName, `%${searchText}%`),
        // ilike(customers.lastName, `%${searchText}%`),
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
    );

  return results;
}

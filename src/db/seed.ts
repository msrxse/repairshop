import "dotenv/config";
// import { eq } from "drizzle-orm";
import { customers, tickets } from "./schema";
import { db } from "@/db";

async function main() {
  // Adding customers
  const customer: typeof customers.$inferInsert = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address1: "123 Main St",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    notes: "Customer since 2020",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(customers).values(customer);
  console.log("New customer created!");

  const allCustomers = await db.select().from(customers);
  console.log("Getting all users from the database: ", allCustomers);

  // Adding tickets

  const ticket: typeof tickets.$inferInsert = {
    customerId: 1,
    title: "Laptop not powering on",
    description:
      "Customer reported that their laptop does not power on even when plugged in.",
    completed: false,
    tech: "unassigned",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(tickets).values(ticket);
  console.log("New ticket created!");

  const allTickets = await db.select().from(tickets);
  console.log("Getting all tickets from the database: ", allTickets);

  // await db
  //   .update(usersTable)
  //   .set({
  //     age: 31,
  //   })
  //   .where(eq(usersTable.email, user.email));
  // console.log("User info updated!");

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log("User deleted!");
}

main();

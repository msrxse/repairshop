import { db } from "./index";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration completed");
  } catch (error) {
    // Send this to Sentry
    console.log("Error during migration", error);
    process.exit(1);
  }
};

main();

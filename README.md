# Next.js Full Stack Project

This full stack app will include Next.js, TypeScript, Tailwind CSS, ShadCN/ui, a dockerized Postgres DB, Drizzle ORM, Zod, next-safe-action, react-hook-form, next-safe-action, and TanStack Table.

Scenes:

- Customer Search
  <img src="assets/Customer Search.jpeg" width="800" />
- New Customer
  <img src="assets/New Customer.jpeg" width="800" />

- Tickets List
  <img src="assets/Ticket Search.jpeg" width="800" />

- New Tickets
  <img src="assets/New Ticket.jpeg" width="800" />

## Getting Started

First, ensure docker container is running

```
docker start drizzle-postgres
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication

- This authentication setup implements a custom auth solution and it is for educational purposes only. For increased security and simplicity, is always recommended to use an authentication library instead.

- Here are the steps taken:

  - The user submits their credentials through a form.
  - The form sends a request that is handled by an API route.
    Here we use useActionState(), passing it a server action and initialState, and it returns the action to use in your form, along with the latest state and pending state of the form submission.
  - Upon successful verification, the process is completed, indicating the user's successful authentication.
    During verification, the hook allows the UI to have the latest state as given from the result of verifying the user. So the form can display errors and pending state right away. Also, useActionState allows the server response from submitting the form to be displayed even before hydration has completed.
  - If verification is unsuccessful, an error message is shown.
  - See `src/app/login/actions.ts` file for details on hardcoded user. This is temporary until database is set.

- On validation success, we want to create a session. In this case, that is to create an HTTP-only cookie storing a JWT token. We are using a stateless authentication and with the `jose` SignJWT function we are able to properly encrypt the user data into the JWT token. To decrypt we use jwtVerify from same library.
- Here on onwards we use a NextJS middleware that runs on every request and checks the cookie. If the user has a session it is allowed to visit protected routes otherwise we redirect to the login page.

## Docker DB

- We run our database on a docker container. Using Drizzle and postgreSQL.
- Se below on database run and initial setup.

```
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

## DB migrations

- We are using a plain postgresql database on a docker container
- Any changes to the schema and you need to create a db migration. Implies generating the SQL migration files based on your Drizzle schema and then apply those changes to your database.

```
npm run db:generate
npm run db:migrate
```

## Seeding the DB

```
npx tsx src/db/seed.ts
```

or

```
bun tsx src/db/seed.ts
```

## Ensure docker container is started

```
docker start drizzle-postgres
```

## How to check postgres database in docker volume

```
docker ps // get container-id from output

<!-- Access the docker container -->
docker exec -it <CONTAINER _ID> bash

<!-- Connect to the postgresql db -->
psql -U <db_user> -d <db_name>

<!-- or all together -->
<!-- docker exec -it {CONTAINER _ID} psql -U {USERNAME} -d {postgres db name} -->
<!-- for example: docker exec -it 6587f794d1ac psql -U postgres -d postgres -->

<!-- Navigate and inspect db -->
\l  // list all dbs

\c <DATABASE_NAME> // connect to a different db

\dt // view tables on current db

postgres=#  // this is the command prompt you should be seeing

<!-- Any SQL allowed now (see data folder for some seeding SQL) -->

SELECT * FROM customers;
SELECT * FROM tickets; // press q to exit

\q // to quit psql

exit // to exit the docker container prompt

```

Notes:

- [See this link for all psql commands](https://tomcam.github.io/postgres/)
- Once you have the command prompt you can run the SQL in the data folder. Or see the `Seed the DB` section here.

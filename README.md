This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

- This authentication setup implement a custom auth solution and is for educational purposes only. For increased security and simplicity, is always recommended to use an authentication library instead.

- Here are the steps taken:

  - The user submits their credentials through a form.
  - The form sends a request that is handled by an API route.
    Here we use useActionState(), passing it a server action and initialState, and it returns the action to use in your form, along with the latest state and the pending state of the form submission.
  - Upon successful verification, the process is completed, indicating the user's successful authentication.
    During verification, the hook allows the UI to have the latest state as given from the result of verifying the user. So the form can display errors and loading state right away. Also, useActionState allows the server response from submitting the form to be displayed even before hydration has completed.
  - If verification is unsuccessful, an error message is shown.

- On validation success, we want to create a session. In this case, that is to create an HTTP-only cookie storing a JWT token. We are using a stateless authentication and with the `jose` SignJWT function we are able to properly encrypt the user data into the JWT token. To decrypt we use jwtVerify from same library.
- Here on onwards we use a NextJS middleware that runs on every request and checks the cookie. If the user has a session it is allowed to visit protected routes otherwise we redirect to the login page.

## Docker DB

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

## How to check postgres database in docker volume

```
docker ps // get container-id from output
docker exec -it {CONTAINER _ID} psql -U {USERNAME} -d {postgres db name}
```

// for example: docker exec -it 6587f794d1ac psql -U postgres -d postgres

```
postgres=# show dbs
postgres=# \q
```

## Seeding the DB

```
npx tsx src/db/seed.ts
```

or

```
bun tsx src/db/seed.ts
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

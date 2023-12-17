# Local setup

Install dependencies:

```
pnpm install
```

Copy the env example file:

```
cp .env.example .env
```

Update fields in `.env`

Make sure you remember to also update the `docker-compose-test.yml` file!

This repo comes with a default `User` model out of the box defined in the `/apps/backend/src/database/prisma.schema` file:

```ts
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

Before you can use the local server, you need to apply this migration to your local Postgres database.

Make sure on your local machine you don't have any existing Docker containers running that would cause a conflict.

Then spin up the local Postgres database using this script:

```
pnpm docker:start
```

Then run this script to apply the migration to your local Postgres database:

```
pnpm db:migrate:dev
```

And that's it!

You can now spin up your local server with this script:

```
pnpm start:dev
```

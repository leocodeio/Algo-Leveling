# how to run the server

```bash
pnpm install
pnpm run dev
```

---

#### Setup database

```bash
pnpm install prisma
npx prisma init

# Export data to file
cd prisma
pg_dump -h localhost -U judge0 -d judge0 -p 8081 --data-only -f seed.sql

# Create new database and import
npx prisma migrate dev
psql -h localhost -U judge0 -d judge0 -p 8081 -f seed.sql
```

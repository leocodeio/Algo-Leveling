## 🗄️ Database Setup

### 🧪 Test Connection

Inside Docker container:

```bash
docker ps
docker exec -it judge0-v1131-db-1 bash
psql -h localhost -U judge0 -d judge0 -p 5432 -W
# enter password: you have mentioned in judge0.conf
\q
exit
```

In local terminal:

```bash
psql -h localhost -U judge0 -d judge0 -p 8081 -W
# enter password: you have mentioned in judge0.conf
\q
```

---

### 📂 Create Database

**Note**: No manual creation is needed. The database initializes automatically when the Docker container starts.

```sql
judge0=# \dt
               List of relations
 Schema |         Name         | Type  | Owner
--------+----------------------+-------+--------
 public | ar_internal_metadata | table | judge0
 public | clients              | table | judge0
 public | languages            | table | judge0
 public | schema_migrations    | table | judge0
 public | submissions          | table | judge0
(5 rows)
```

**Additional Tables**: We will add tables manually for user management and parallel Judge0 functions.

### 📑 Exporting and Importing Data

```bash
cd web-app/be-source
pnpm install prisma
npx prisma init

# Export data to file
cd prisma
pg_dump -h localhost -U judge0 -d judge0 -p 8081 --data-only -f seed.sql

# Create new database and import
npx prisma migrate dev
psql -h localhost -U judge0 -d judge0 -p 8081 -f seed.sql
```

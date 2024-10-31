![WhatsApp Image 2024-10-29 at 17 52 38_02e84587](https://github.com/user-attachments/assets/acce006d-a9ad-4c98-aa73-e97af8da222d)
![WhatsApp Image 2024-10-29 at 17 52 46_a70e27e7](https://github.com/user-attachments/assets/6ec9df75-0805-42eb-9646-0c9997c9ad90)

## 🚀 Setup

```bash
# 🐳 Install Docker
# 📂 Create Project Folder and open it (VS Code or preferred editor)
```

---

## 🛠️ Run Needy Services

```bash
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

---

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
pnpm install prisma
npx prisma init

# Export data to file
cd prisma
pg_dump -h localhost -U judge0 -d judge0 -p 8081 --data-only -f seed.sql

# Create new database and import
npx prisma migrate dev
psql -h localhost -U judge0 -d judge0 -p 8081 -f seed.sql
```

---

### 🏃‍♂️ Run the Project

Navigate to `web-app/be-source` folder:

```bash
pnpm install
pnpm run dev
```

Navigate to `web-app/problem-generator` folder:

```bash
pnpm install
pnpm run generate
```

Navigate to `web-app/ui-source` folder:

```bash
pnpm install
pnpm run dev
```

---

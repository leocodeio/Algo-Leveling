![WhatsApp Image 2024-10-29 at 17 52 38_02e84587](https://github.com/user-attachments/assets/acce006d-a9ad-4c98-aa73-e97af8da222d)
![WhatsApp Image 2024-10-29 at 17 52 46_a70e27e7](https://github.com/user-attachments/assets/6ec9df75-0805-42eb-9646-0c9997c9ad90)

## 🚀 Setup

```bash
# 🐳 Install Docker
# 📂 git clone https://github.com/leocodeio/Algo-Leveling.git
# 📂 cd Algo-Leveling
```

---

## 🛠️ Run Needy Services

```bash
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

### 📑 Exporting and Importing Data

```bash
cd web-app/backend
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

Navigate to `web-app/backend` folder:

```bash
cd web-app/backend
pnpm install
pnpm run dev
```

Navigate to `web-app/problem-generator` folder:

```bash
cd web-app/problem-generator
pnpm install
pnpm run generate
```

Navigate to `web-app/frontend` folder:

```bash
cd web-app/frontend
pnpm install
pnpm run dev
```

---

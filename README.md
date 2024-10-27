![image](https://github.com/user-attachments/assets/3c03aa0c-8f4d-4c41-8926-223167ec3800)

## setup

```
install docker
create project folder and open (vs or cursor)
```

## run needy services

```
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

## setup database

#### test connection

inside docker container

```
docker ps
docker exec -it judge0-v1131-db-1 bash
psql -h localhost -U judge0 -d judge0 -p 5432 -W
// enter password: you have mentioned in judge0.conf
\q
exit
```

In local terminal

```
psql -h localhost -U judge0 -d judge0 -p 8081 -W
// enter password: you have mentioned in judge0.conf
\q
```

#### create database

**There is no need to create database manually. It will be created automatically when the docker container is started.**

```
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

But in this project, we need to add some tables manually for user management and parallel judge0.
**we take out the data from the database and save it to a file.**
and then we will use the file to create a new database for the project.
**we will use the file to copy the date from the file to the new database.**

```
pnpm install prisma
npx prisma init

// write up the data to the file
cd prisma
pg_dump -h localhost -U judge0 -d judge0 -p 8081 --data-only -f seed.sql

// create a new database
npx prisma migrate dev

// copy data from seed.sql to the new database
psql -h localhost -U judge0 -d judge0  -p 8081 -f seed.sql
```

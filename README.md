
## setup

```
install docker
create project folder and open (vs or cursor)
```

## Install Judge0

```
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
```


update the variable REDIS_PASSWORD in the judge0.conf file.
pdate the variable POSTGRES_PASSWORD in the judge0.conf file.

**in docker-compose.yml, change the port of the db to 8081:5432**

```
cd judge0-v1.13.1
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
visit docs at http://localhost:2358/docs`
visit docs at http://localhost:2358/dummy-client.html

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

// write up schema in prisma/schema.prisma
npx prisma migrate dev --name init

// write up the data to the file
cd prisma
pg_dump -h localhost -U judge0 -d judge0 -p 8081 --data-only -f seed.sql

prisma migrate dev

// copy data from seed.sql to the new database
psql -h localhost -U judge0 -d judge0  -p 8081 -f seed.sql
```

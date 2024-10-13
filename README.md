
## setup

```
install docker
setup wsl
create project folder and open in wsl remote (vs or cursor)
```

## Install Judge0

```
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
```


update the variable REDIS_PASSWORD in the judge0.conf file.
pdate the variable POSTGRES_PASSWORD in the judge0.conf file.
update the variable AUTHN_TOKEN in the judge0.conf file.

```
cd judge0-v1.13.1
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
visit docs at http://localhost:2358/docs`
visit docs at http://localhost:2358/dummy-client.html

## Run the app

```
yarn run dev
```
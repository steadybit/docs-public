---
title: "Install as Docker Container"
---

### Oneliner

The platform container image is available in our private Docker Registry.

```sh
curl -sfL https://get.chaosmesh.io/platform.sh | sh -s -- -a <api-key> -d <jdbc-url> -u <jdbc-user> -p <jdbc-password>
```

### Manual setup

First login to the chaosmesh Docker Registry:

```sh
docker login -u=_ -p=<apikey> docker.chaosmesh.io
```

Then run the chaosmesh Platform Docker Container with the following command.
Please note that you might need to add additional env vars for the authentication using LDAP / OAuth2.

```sh
sudo docker run \
  --detach \
  --name chaosmesh-platfom \
  --env="SPRING_DATASOURCE_URL=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_USERNAME=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_PASSWORD=<replace-with-jdbc-url>" \
  --env="CHAOSMESH_TENANT_NAME=<replace-with-tenant-name>" \
  --env="CHAOSMESH_TENANT_KEY=<replace-with-tenant-key>" \
  --env="CHAOSMESH_TENANT_APIKEY=<replace-with-api-key>" \
  docker.chaosmesh.io/chaosmesh/platform:latest
```

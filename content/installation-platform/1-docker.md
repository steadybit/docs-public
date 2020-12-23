---
title: "Install Platform as Docker Container"
navTitle: "Docker Container"
---
steadybit is currently always installed as docker container. The platform container image is available in the steadybit Docker Registry.

## Prerequisites

At least a Docker installation and a PostgresSQL database is required to run the platform. The corresponding connection parameters for the database are passed to the installation script.

## Oneliner

For a quick setup you can use this Oneliner:

```bash
curl -sfL https://get.steadybit.io/platform.sh | sh -s -- -a <agent-key> -d <jdbc-url> -e <jdbc-user> -f <jdbc-password> -p <ui-password>
```

With this installation variant, only one user (admin) with administration rights is created. For use in production, we strongly recommend that you connect an internal LDAP or OIDC provider as described below.

## Manual setup

First login to the steadybit Docker Registry:

```bash
docker login -u=_ -p=<agent-key> docker.steadybit.io
```

Then run the steadybit Platform Docker Container with one of the following example commands.
We always require two ports to be open: One for Http (80) and one for websocket connections (7878 - currently cannot be changed.)

### Static

```bash
docker run \
  --detach \
  --name steadybit-platform \
  -p 80:8080 \
  -p 7878:7878 \
  --env="SPRING_DATASOURCE_URL=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_USERNAME=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_PASSWORD=<replace-with-jdbc-url>" \
  --env="STEADYBIT_TENANT_NAME=<replace-with-tenant-name>" \
  --env="STEADYBIT_TENANT_KEY=<replace-with-tenant-key>" \
  --env="STEADYBIT_TENANT_AGENTKEY=<replace-with-agent-key>" \
  --env="STEADYBIT_AUTH_PROVIDER=static" \
  --env="STEADYBIT_AUTH_STATIC_0_USERNAME=admin" \
  --env="STEADYBIT_AUTH_STATIC_0_PASSWORD={noop}admin" \
  docker.steadybit.io/steadybit/platform:latest
```

### External LDAP

```bash
sudo docker run \
  --detach \
  -p "80:8080" \
  -p "7878:7878" \
  --name steadybit-platfom \
  --env="SPRING_DATASOURCE_URL=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_USERNAME=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_PASSWORD=<replace-with-jdbc-url>" \
  --env="STEADYBIT_TENANT_NAME=<replace-with-tenant-name>" \
  --env="STEADYBIT_TENANT_KEY=<replace-with-tenant-key>" \
  --env="STEADYBIT_TENANT_AGENTKEY=<replace-with-agent-key>" \
  --env="STEADYBIT_AUTH_PROVIDER=LDAP" \
  --env="STEADYBIT_AUTH_LDAP_URL=<replace-with-ldap-url>" \
  --env="STEADYBIT_AUTH_LDAP_SYNC_ADMIN_GROUP_DN=<replace-with-admin-group-dn>" \
  --env="STEADYBIT_AUTH_LDAP_SYNC_USER_GROUP_DN=<replace-with-user-group-dn>" \
  --env="STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER=<replace-with-team-search-filter>" \
  docker.steadybit.io/steadybit/platform:latest
```

### OpenId Connect (OIDC)

```bash
sudo docker run \
  --detach \
  -p "80:8080" \
  -p "7878:7878" \
  --name steadybit-platfom \
  --env="SPRING_DATASOURCE_URL=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_USERNAME=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_PASSWORD=<replace-with-jdbc-url>" \
  --env="STEADYBIT_TENANT_NAME=<replace-with-tenant-name>" \
  --env="STEADYBIT_TENANT_KEY=<replace-with-tenant-key>" \
  --env="STEADYBIT_TENANT_AGENTKEY=<replace-with-agent-key>" \
  --env="STEADYBIT_AUTH_PROVIDER=oauth2" \
  --env="STEADYBIT_AUTH_OAUTH2_ISSUER_URI=<replace-with-issuer-uri>" \
  --env="STEADYBIT_AUTH_OAUTH2_CLIENT_ID=<replace-with-client-id>" \
  --env="STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET=<replace-with-client-secret>" \
  --env="STEADYBIT_AUTH_OAUTH2_USER_NAME_ATTRIBUTE=<replace-with-username-attribute>" \
  docker.steadybit.io/steadybit/platform:latest
```

Please note that you might need to add additional env vars for the authentication using LDAP / OAuth2.

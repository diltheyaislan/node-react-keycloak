FROM quay.io/keycloak/keycloak:latest

COPY ./providers/app-db-provider/target/app-db-provider.jar /opt/jboss/keycloak/standalone/deployments

COPY ./realm-App-export.json /opt/jboss/keycloak/
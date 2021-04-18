# Node.js, React, PostgreSQL and Keycloak

Project with front-end in React and back-end in Node.js using Keycloak for authentication and authorization. There is a custom provider developed in Java and integrated with Keycloak to insert new users registered in Keycloak into application's PostgreSQL database.

## Installation

### Set Docker environment variables

The variables used by `docker-compose` are in the `.env` file.

### Build Custom Keycloak Provider

Project name: **app-db-provider**

1. Install `maven`
1. Set the connection parameters of the application database in the `.\keycloak\providers\app-db-provider\pom.xml` file.
	- Set the `<app.database.*>` properties to the connection values of the application database.
	- Use the name of the Docker container for the connection URL in the `<app.database.url>` property
1. Go to `.\keycloak\providers\app-db-provider\` via shell
1. Run `mvn clean install -e`
	- An `app-db-provider.jar` file will be generated in `.\keycloak\providers\app-db-provider\target`
	- This file will be imported by Keycloak

### Back-end application

Directory: `.\node\`

1. Create an `.env` file based on `.env.example`
1. Create an `ormconfig.json` file based on `ormconfig.example.json`
1. Set the `keycloak.json` file with the Keycloak back-end client information

The `ormconfig.docker.json` and `keycloak.docker.json` files are used by `docker-compose`.

### Front-end application

Directory: `.\react\`

1. Create an `.env` file based on `.env.example`
1. Set the `keycloak.json` file in `.\react\public\` with the Keycloak front-end client information

The `.env.docker` and `keycloak.docker.json` files are used by `docker-compose`.

### Application database

In the root directory of the repository:

1. Run `docker-compose build`
1. Run `docker-compose up -d` for create application database
1. Run the `.\app_db.sql` file in the `app` database
1. Stop Docker containers with `docker-compose down`

### Run application

After installation, run `docker-compose up -d`

#### Database

A container with a PostgreSQL image is started. When starting the container for the first time, two databases are created, one for the application and the other for the Keycloak. The application database is called `app` by default and the Keycloak database is called `app_keycloak`.

The name of the container is called `app_db`. This name is also the hostname used by the Custom Keycloak Provider (**app-db-provider**).

Note: these names can be changed in the `.\.env` file.

Can be accessed by hostname `localhost` or `host.docker.internal` on the port `5432` by default.

#### Keycloak

A container with the Keycloak image is executed. The Custom Provider (**app-db-provider**) is deployed and a realm is imported based on the `.\keycloak\real-App-export.json` file.

The name of the container is called `app_keycloak`.

Can be accessed at <http://localhost:8080> by default.

#### Back-end

A container with the Node.js image is executed. The database connection and Keycloak integration files are loaded into the container.

Hostname `host.docker.internal` was used in the `keycloak.docker.json` file for operation using Docker.

The name of the container is called `app_node`.

Can be accessed at <http://localhost:3333> by default.

#### Front-end

A container with the nginx image is executed to run React application. The Keycloak integration file is loaded into the container.

Hostname `host.docker.internal` was used in the `keycloak.docker.json` file for operation using Docker.

The name of the container is called `app_react`.

Can be accessed at <http://localhost:3000> by default.



# Football Scouting

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)

## Installation

### ElasticSearch & MySQL

ElasticSearch is the core database system used in this application. However, in order to register users and keep their data, a MySQL is also used.

The project is built using `docker-compose`, therefore, in the root folder run:

```sh
docker-compose up -d
```

Check running containers with:

```sh
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.RunningFor}}\t{{.Status}}"
```

The output of the before command should look like:

```sh
NAMES              IMAGE                                                  CREATED          STATUS
fs-kibana          docker.elastic.co/kibana/kibana:7.15.2                 25 minutes ago   Up 25 minutes
fs-mysql           mysql                                                  25 minutes ago   Up 25 minutes
fs-elasticsearch   docker.elastic.co/elasticsearch/elasticsearch:7.15.2   25 minutes ago   Up 25 minutes

```

Before starting the application, open the `fs-mysql` container and run as follows:

```sh
# enter fs-mysql
docker exec -it fs-mysql bash

# enter mysql database with root password
mysql -u root -p
# type root in the password promt

# alter the root user to allow client connections
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

# exit the console of the container by writing exit twice
```

Applying this changes will allow the node server to securely create a mysql connection.

### Application

The application is built with JavaScript, using the React framework. The API that holds the interaction with the application uses the ExpressJS framework. The database integration with ExpressJS it is possible using the `mysql` and `elasticsearch` packages.  
This repository is built using the `workspaces` feature that comes with [`npm-cli`](https://docs.npmjs.com/cli/v7/using-npm/workspaces), therefore, the `npm` recommended version is `^7.0.0`. `npm` requires NodeJS. Using workspaces, the installed packages will be stored in the root `node_modules` folder and will be symlinked into the workspace which uses such module.  
After installing NodeJS and `npm`, you can check their versions:

```sh
node -v
16.10.0

npm -v
7.24.0
```

In order to run the project, you have to install the required dependencies from the root directory:

```sh
npm install
```

#### Adding dependencies

If there's the need to install a dependency in a workspace (`client` or `server`), run:

```sh
npm install <package-name> -w <workspace-name>
# or
npm install <package-name> --workspace=<workspace-name>
```

## Development

Once the containers are up, you can run the entire full stack application by running:

```sh
npm run start
```

In order to exclusively launch one of the applications, the commands to be used are:

```sh
# back-end
npm run start:server

# front-end
npm run start:client
```

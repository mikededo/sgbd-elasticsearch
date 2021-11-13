# Footbal Scouting

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)

## Installation

### ElasticSearch & MySQL

ElasticSearch is the core database system used in this application. However, in order to register users and keep their data, a MySQL is also used.

First, pull the latest images using the commands below in termial or using any docker application:

```sh
# elasticsearch image does not have a latest tag
docker pull elasticsearch:7.14.1
docker pull mysql
```

Create both containers:

```sh
# for elasticsearch
docker run -p 9200:9200 \
    -p 9300:9300 \
    -e "discovery.type=single-node" \
    --name fs-elasticsearch \
    -d elasticsearch:7.14.1

# for mysql
# make sure no other running mysql container is blocking the port
docker run -p 3306:3306 \
    -e "MYSQL_ROOT_PASSWORD=root" \
    --name fs-mysql \
    -d mysql
```

> In order to reduce the amount of memory used by the containers, the prop `--memory` can be additionally passed when running the container.  
> For example, limiting mysql to 1gb of memory:
> `docker run --memory="1g" -d mysql`

Check running containers with:

```sh
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.RunningFor}}\t{{.Status}}"
```

The output of the before command should look like:

```sh
NAMES                IMAGE                  CREATED         STATUS
fs-mysql             mysql                  2 minutes ago   Up 2 minutes
fs-elasticsearch     elasticsearch:7.14.1   2 minutes ago   Up 2 minutes
```

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

## Run the application

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

# Todo list app - Angular

This project is a simple todo list application, wrtten in Node.js using Angular for the **UI** and express.js for an **API**, with Postgres as a **database**.

For ease of use, this project has been dockerised into different containers for its moving parts.

---

## Moving parts

- Express.js API, using Sequelize as an ORM to communicate with Postgres
- Postgres database
- Angular UI

---

## How to use

In the root **package.json** there are commands to run the project orchestrated through **docker compose**. There are also commands to only run the database.

Each of the commands returns `docker-compose` appended with the docker compose `.yml` files for that configuration, you can add any other options, like you would with a `docker-compose` command

For example

```
npm run dev up -detach --abort-on-container-exit
```

### Running the whole project

- `npm run dev up` - runs the project in dev mode, this watches for file changes in both **UI** and **API**

### Using docker for database only

- `npm run db:dev up` - runs the database in the dev configuration
- `npm run db:dev:view up` - runs the dev database with an attached admin database console hosted on port `8080`

---

## Coming soon

- QA environment, with mock data inserted into the database for tests also using builds of projects instead of watching for files
- PROD environment, using builds of the projects like QA, but without any mock data
- Testing section of Readme for how to run tests for different components of the project
- Commands for building the images

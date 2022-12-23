# Vaccine Management Backend

The REST API for the Vaccine Management System.

## Installation

Make sure you have `Node.js` ,`Yarn` and `PostgreSQL` database installed.
`Yarn` is the recommended package manager.

```bash
  git clone git@github.com:sachinworkk/vaccine-management-backend.git
  cd vaccine-management-backend
  yarn install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`NODE_ENV`

`DB_CLIENT`

`DB_HOST`

`DB_PASSWORD`

`DB_NAME`

`DB_USER`

`ORIGIN`

`ACCESS_TOKEN_PRIVATE`

`ACCESS_TOKEN_PUBLIC`

`REFRESH_TOKEN_PRIVATE`

`REFRESH_TOKEN_PUBLIC`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

## Running the database for the first time

Running the migrations

```bash
   yarn run migrate
```

## Starting the project

After successfully adding all the dependencies and setting up the database start the project by

```bash
   yarn start
```

## Running Tests

To run tests, run the following command

```bash
  yarn run test
```

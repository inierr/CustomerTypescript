# CustomerTS

This is a simple CRUD Application using Express + Vue built with Typescript

[toc]

---

## Folders

`api` - Express App
`client` - Vue App

## How to run app

Install both module dependencies for both `api` and `client` folder.

```shell
npm install
```

### Express App

Express App has built with PostgreSQL and Typescript.

---

Build `api` app, create your `.env` file, then run the server.

```shell
cd api

npm run build

touch .env

npm start
```

### Vue App

Vue app is built on top of Bootstrap-Vue and Typescript.

---

Create your `.env` file, then run the server.

```shell
cd client

touch .env

npm run serve
```
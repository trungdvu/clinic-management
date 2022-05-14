# Clinic Management

## Short Description:

A project that helps Clinics - Hospitals manage more efficiently. It provides most of the needed features and processes that every clinic need.

## Quick Start

Env requires: [Node.js](https://nodejs.org/en/) LTS v16 installed

**Clone the project**

```
  git clone https://github.com/trungdvu/clinic-management.git
```

## How to run Frontend:

1. Go to UI repo

```
  cd service-portal/
```

2. Install dependencies

```
  npm install
```

3. Start it up

```
  npm start
```

## How to run Backend:

1. Go to server repo:

```
  cd server/
```

2. Install dependencies:

```
  npm i
```

3. Start server and sync database:

```
  npm run dev
```

4. Open new terminal tab and run seeder to seed static data to Database:

```
  npm run db:seed
```

## Tech Stack

**Frontend**:

- [React](https://reactjs.org)
- [Redux](https://redux.js.org), [Rematch](https://rematchjs.org)
- [Ant Design](https://ant.design) w/ [TailwindCSS](https://tailwindcss.com)

**Backend**:

- [NodeJS](https://nodejs.org/en/docs/)
- Framework: [ExpressJS](https://expressjs.com)
- Database: [PostgreSQL](https://www.postgresql.org/docs)
- Applied MVC Pattern

## About The Repo

As you see, there's lots of `index.js` file in folders. We just follow the Barrel Pattern, it isn't good for [Code splitting](https://reactjs.org/docs/code-splitting.html), though.

## VSCode Extensions

Some useful visual studio code extensions that you might want to use in this repo.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

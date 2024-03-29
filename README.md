# Clinic Management

## Demo

Youtube: [Local demo](https://www.youtube.com/watch?v=xwMkR1dV_lM)

<img width="1602" alt="Screenshot 2023-01-06 at 9 21 02 PM" src="https://user-images.githubusercontent.com/96437142/211030741-2319e802-8b90-406c-b1d2-e0836ff2eb21.png">


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

3. Start server to sync database:

```
  npm run dev
```

4. Open new terminal tab and run seeder to seed static data to Database:

```
  npm run db:seed
```

5. And then, start it again:

```
  npm run dev
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

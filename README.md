
# Express, Mongodb, Typescript RestAPI Service

  

## Clarification and credit 📜

This repo is direct copied and improvised from this [repo](git@github.com:morshedmasud/express-mongoDB-typescript-restAPI-starter.git). A big applause for the author [morshedmasud](https://github.com/morshedmasud) 👏👏👏
  

## Technology used 🛠️

1. Node

2. Express JS

3. Typescript

4. MongoDB

  

## Features ✨

* User SignIn/SignUp

* Basic Authentication with jwt-http

* OAuth 2.0 (Authentication with Access & Refresh Token)

* Data Validation with JOI

* Unit Testing

* Email Verification

* Docker Configuration

* Swagger Documentation

  

## Folder structure 📁

  

```

.

├── .env.example

├── .eslintrc.json

├── .git

│ ├── FETCH_HEAD

│ ├── HEAD

│ ├── config

│ ├── description

│ ├── hooks

│ │ ├── applypatch-msg.sample

│ │ ├── commit-msg.sample

│ │ ├── fsmonitor-watchman.sample

│ │ ├── post-update.sample

│ │ ├── pre-applypatch.sample

│ │ ├── pre-commit.sample

│ │ ├── pre-merge-commit.sample

│ │ ├── pre-push.sample

│ │ ├── pre-rebase.sample

│ │ ├── pre-receive.sample

│ │ ├── prepare-commit-msg.sample

│ │ ├── push-to-checkout.sample

│ │ └── update.sample

│ ├── index

│ ├── info

│ │ └── exclude

│ ├── logs

│ │ ├── HEAD

│ │ └── refs

│ ├── objects

│ │ ├── info

│ │ └── pack

│ ├── packed-refs

│ └── refs

│ ├── heads

│ ├── remotes

│ └── tags

├── .gitignore

├── Dockerfile

├── README.md

├── custom.d.ts

├── docker-compose.yml

├── jest.config.js

├── package.json

├── src

│ ├── app.ts

│ ├── config

│ │ ├── cors.ts

│ │ ├── express-rate.ts

│ │ ├── express-slow-down.ts

│ │ ├── logger.ts

│ │ ├── mongoose.ts

│ │ ├── morgan.ts

│ │ ├── passport-http.ts

│ │ ├── passport-jwt.ts

│ │ └── server.ts

│ ├── controllers

│ │ ├── auth.controller.ts

│ │ └── user.controller.ts

│ ├── middleware

│ │ └── auth.ts

│ ├── models

│ │ └── user.model.ts

│ ├── routes

│ │ ├── auth.route.ts

│ │ └── user.route.ts

│ ├── services

│ │ ├── __tests__

│ │ └── user.service.ts

│ ├── utils

│ │ ├── ApiError.ts

│ │ ├── catchAsync.ts

│ │ ├── constants.ts

│ │ ├── email.ts

│ │ ├── response.ts

│ │ ├── tokens.ts

│ │ └── validationError.ts

│ └── validations

│ └── auth.validation.ts

├── swagger.json

├── tsconfig.json

└── yarn.lock

```

  
  
  

## Setup in your local machine, and running  🖥️

1. Clone project 🖱️

```

git clone git@github.com:morshedmasud/express-mongoDB-typescript-restAPI-starter.git

```

2. Go to project root path and install all dependency with 💻

```

yarn install

```

3. Don't forget to create **.env** file as like **.env.example** and put necessary values like DB Info, Email Info 🪵

```shell script

cp  .env.example  .env

```

4. Start your mongodb service 💾

5. Run the project 🚀

```shell script

//  development  server

yarn  run  dev

  

//  build  project

yarn  build

  

//  production  server

yarn  run  start

```

  

6. Run With Docker 🛥️

```shell script

//  build

sudo  docker-compose  build

  

//  run

sudo  docker-compose  up

```

  

7. Testing 🧪

```shell script

//  run  all  unit-test

yarn  run  test:unit

  

//  run  individual  unit-test  file

yarn  run  test:unit  src/services/__tests__/auth.ts

```

  
  

#### Open the following url for view swagger documentation

## (http://localhost:3031/swagger-docs)
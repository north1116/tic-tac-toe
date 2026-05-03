This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

node version: v24.15.0
prisma database: mysql

## Getting Started

run following command to install relate tool
```bash
npm install
```

afterward create .env and add following value
```bash
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
NEXT_AUTH_URL="http://localhost:3000"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_NAME="tic-tac-toe"
```

you may need to have AUTH_GOOGLE_ID, and AUTH_GOOGLE_SECRET that generate from Google Console

for AUTH_SECRET run
```bash
npx auth secret
```

then add following database env following your mysql database config
```bash
DATABASE_USER=
DATABASE_PASSWORD=
```

then in DATABASE_URL env
```bash
DATABASE_URL="mysql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:3306/tic-tac-toe"
```

for example
```bash
DATABASE_URL="mysql://root:admin@localhost:3306/tic-tac-toe"
```

after that run
```bash
npx prisma generate
npx prisma migrate deploy
```

then, run the development server:

```bash
npm run dev
```
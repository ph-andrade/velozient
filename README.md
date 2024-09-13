# Velozient Inventory Tracker
Thanks for the opportunity and I apologize if I missed any requirements or if I misunderstood any of them, this week that I developed this project was extremely busy, anything you can tell me and I can review it.

#About
API built with Nest.js and Prisma.
FrontEnd build with Next.js.

I decided to use both because they are currently being widely adopted by many companies due to their ease of use and standardized structure.

## Running front and backend with docker
Change configs in "docker-compose.yml" if you want.

```sh
# create a docker container with application (frontend, backend)
docker compose up

# if server stops
docker compose start
```

## Running front and backend locally

```sh
# running backend
cd backend

npm install

# start the server
npm run start:dev

# run unit tests
npm run test
```

```sh
# running frontend
cd frontend

#change api url in .env file
npm install

# start the server
npm run dev
```

The frontend application is running on port 3000 (http://localhost:3000).
The backend application is running on port 3333 (http://localhost:3333).
Access http://localhost:3333/api#/ for documentation.

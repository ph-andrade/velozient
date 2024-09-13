# Hubla
Thanks for the opportunity and I apologize if I missed any requirements or if I misunderstood any of them, this week that I developed this project was extremely busy, anything you can tell me and I can review it.

#About
API built with Nest.js and Prisma.
FrontEnd build with Next.js.

## Running Locally
Change configs in "ormconfig.json". 

Create the database locally.

```sh
# running backend
cd backend

#change db url in .env file to your mysql connection
npm install

#running migrations
npx prisma migrate dev

# start the server
npm run start:dev
```

```sh
# running frontend
cd frontend

#change api url in .env file
npm install

# start the server
npm run dev
```

## Running front, backend and database with docker
Change configs in "docker-compose.yml" if you want.

```sh
# create a docker container with application (frontend, backend) and database
docker compose up

# if server stops
docker compose start
```

The frontend application is running on port 3000 (http://localhost:3000).
The backend application is running on port 3333 (http://localhost:3333).
Access http://localhost:3333/api#/ for documentation.

#improvement points

*Add filters in frontend:
I didn't because my days are very busy because of my work but it would certainly be much better with filters in the listings, but as this is a skills assessment project I believe that filters would be irrelevant for assessment because they are easy tasks. But if this is a problem I can easily review and add them to the project, just let me know.

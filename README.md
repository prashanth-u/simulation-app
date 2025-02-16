# simulation-app

Task 1)
Logic question can be found in simulation_script directory.
task1.js - contains the first problem.
task1-bonus.js - I have solved the following:
    -> Run the program from task 1 for between 1 and 30 chargepoints. How does the concurrency factor behave? 
    You can find the result in the comments
    -> If you consider the impact of DST vs. mapping the hours to the 15 minute ticks.
    Included an option to adjust ticks

Task 2b)
- Used Typescript, Postgres, Prisma, Node.js, Express, and GraphQL.
- All the services are containerized.
- Note: This is not PRODUCTION ready.
- Run the following commands to start the containers:

docker-compose up --build -d

This should start all the required containers:
-> simulation-app
-> simulation-db

The app service runs in port 4000. The DB runs in 5432 port. 

USER: user
PASSWORD: password
DATABASE: simulation_db

TO TEST:
- Download Postman or any other similar tool
- http://localhost:4000/graphql - This is the URL
- You can find the graphql schema in src/graphql/schema.ts
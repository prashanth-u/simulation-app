import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphql/schema";
import { simulationResolver } from "./modules/simulation/simulation.resolver";
import cors from "cors";

const app = express();
app.use(cors());

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: simulationResolver,
  })
);

export default app;

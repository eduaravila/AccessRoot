import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import bp from "body-parser";
import serverless from "serverless-http";
import express_user_ip from "express-ip";

import { buildFederatedSchema } from "./helpers/buildFederatedSchema";
//?  decorators metadata

import connectDB from "./DB/index";
import { RegisterResolver } from "./resolvers/UserResolver";

const PORT: string = process.env.PORT || "3000";
// Initialize the app
const app = express();
app.use(
  /\/((?!graphql).)*/,
  bp.urlencoded({
    limit: "50mb",
    extended: true
  })
);
app.use(
  /\/((?!graphql).)*/,
  bp.json({
    limit: "50mb"
  })
);

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});

app.use(express_user_ip().getIpInfoMiddleware); //* get the user location data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //* dominios por donde se permite el acceso
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,UPDATE,PUT"); //* metodos permitidos por el cliente
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  //* dominios por donde se permite el acceso
  //* graph ql no envia una respuesta valida con el tipo options, cuando hay un tipo de request OPTIONS se retorna una respuesta con el estado 200
  // * graphql does not send a valid response when the OPTIONS request is received, if a OPTIONS request type is presented server return an empty response with the code 200
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});

const handler = serverless(app);

module.exports = app;
module.exports.handler = async (event: any, context: any) => {
  // you can do other things here
  const result = await handler(event, context);
  try {
    const server = new ApolloServer({
      schema: await buildFederatedSchema({
        resolvers: [RegisterResolver]
      }),
      context: ({ req }: any) => {
        return req;
      },
      formatError: (err: any) => {
        return err;
      },
      playground: true,
      introspection: true
    });
    // The GraphQL endpoint

    // Start the server
    await connectDB();
    server.applyMiddleware({ app, path: "/graphql" });

    // app.listen(PORT, () => {
    //   console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
    // });
  } catch (error) {
    console.log(error);
  }
  return result;
};

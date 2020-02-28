"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const serverless_http_1 = __importDefault(require("serverless-http"));
const buildFederatedSchema_1 = require("./helpers/buildFederatedSchema");
const body_parser_1 = __importDefault(require("body-parser"));
const express_ip_1 = __importDefault(require("express-ip"));
//?  decorators metadata
require("reflect-metadata");
const index_1 = __importDefault(require("./DB/index"));
const UserResolver_1 = require("./resolvers/UserResolver");
const PORT = process.env.PORT || "3000";
const app = express_1.default();
const handler = serverless_http_1.default(app);
module.exports.handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield handler(event, context);
    // and here
    app.use(/\/((?!graphql).)*/, body_parser_1.default.urlencoded({
        limit: "50mb",
        extended: true
    }));
    app.use(/\/((?!graphql).)*/, body_parser_1.default.json({
        limit: "50mb"
    }));
    (() => __awaiter(void 0, void 0, void 0, function* () { }))();
    try {
        app.use(express_ip_1.default().getIpInfoMiddleware); //* get the user location data
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
        const server = new apollo_server_express_1.ApolloServer({
            schema: yield buildFederatedSchema_1.buildFederatedSchema({
                resolvers: [UserResolver_1.RegisterResolver]
            }),
            context: ({ req }) => {
                return req;
            },
            formatError: (err) => {
                return err;
            },
            playground: true,
            introspection: true
        });
        // The GraphQL endpoint
        // Start the server
        yield index_1.default();
        server.applyMiddleware({ app, path: "/graphql" });
    }
    catch (error) {
        console.log(error);
    }
    // and here
    return result;
});
//# sourceMappingURL=index.js.map
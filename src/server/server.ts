import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AServer } from "../types/abstract-class-server.js";
import { Database } from "../db/database.js";
import { HttpError } from "@fastify/sensible";
import { AuthorRoutes } from "./author.routes.js";

export class Server extends AServer {
    protected DB: Database = new Database()
    private authorRoutes: AuthorRoutes
    constructor(app: FastifyInstance) {
        super(app)
        this.authorRoutes = new AuthorRoutes(this.app)
    }
    async RunServer(port: number): Promise<void> {
        try {
            await this.DB.ConnectToDB()
            this.SetupRoutes()
            await this.app.listen({port, host: "0.0.0.0"})
            console.log(`server is running on ${port}`)
        } catch (error) {
            this.app.log.error(error)
            process.exit(1)
        }
    }
    protected SetupRoutes() {
        this.app.get("/", async(request, reply) => {
            return reply.code(200).send({"message": "hello world!"})
        })
        this.app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
            if (error instanceof HttpError) {
              reply.status(error.statusCode || 500).send({
                error: error.message || "Internal Server Error"
              });
            } else {
              reply.status(500).send({
                error: error.message,
              });
            }
        })
        this.authorRoutes.setupRoutes()
        console.log("routes are working!")
    }
}
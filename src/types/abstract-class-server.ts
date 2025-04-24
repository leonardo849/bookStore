import { FastifyInstance } from "fastify";
import { Database } from "../db/database.js";

export abstract class AServer {
    protected DB!: Database;
    constructor(protected readonly app: FastifyInstance) {}
    abstract RunServer(port: number): Promise<void>
    protected abstract  SetupRoutes(): void
}
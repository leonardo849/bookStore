import { FastifyInstance } from "fastify";

export abstract class ASetupRoutes {
    constructor(protected readonly app: FastifyInstance) {

    }
    abstract setupRoutes(): void;
}
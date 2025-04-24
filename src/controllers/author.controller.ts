import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthorService } from "../services/author.service.js";
import { CreateAuthorDTO, FindAuthorDTO } from "../dto/author.dto.js";

export class AuthorController {
    private authorService: AuthorService
    constructor(app: FastifyInstance) {
        this.authorService = new AuthorService(app)
    }
    async CreateAuthor(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as CreateAuthorDTO
        try {
            await this.authorService.CreateOneAuthor(body)
            reply.status(200).send({message: "author was created"})
        } catch (error) {
            throw error
        }
    }
    async FindAllAuthors(request: FastifyRequest, reply: FastifyReply) {
        try {
            const authors = await this.authorService.FindAllAuthors()
            reply.status(200).send(authors)
        } catch (error) {
            throw error
        }
    }
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthorService } from "../services/author.service.js";
import { CreateAuthorDTO, FindAuthorDTO, UpdateAuthorDTO } from "../dto/author.dto.js";
import { RouteParamsID } from "../types/route-params.js";



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
    async FindOneAuthor(request: FastifyRequest<{Params: RouteParamsID}>, reply: FastifyReply) {
        const id = request.params.id
        try {
            const author = await this.authorService.FindOneAuthor(id)
            reply.status(200).send(author)
        } catch (error) {
            throw error
        }
    }
    async UpdateAuthor(request: FastifyRequest<{Params: RouteParamsID}>, reply: FastifyReply) {
        const id = request.params.id
        const body = request.body as UpdateAuthorDTO
        try {
            await this.authorService.UpdateOneAuthor(id, body)
            reply.status(200).send({message: "author was updated"})
        } catch (error) {
            throw error
        }
    }
    async DeleteAuthor(request: FastifyRequest<{Params: RouteParamsID}>, reply: FastifyReply) {
        const id = request.params.id
        try {
            await this.authorService.DeleteAuthor(id)
            reply.status(200).send({message: "author was deleted"})
        } catch (error) {
            throw error
        }
    }
}
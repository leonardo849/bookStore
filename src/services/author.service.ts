import { FastifyInstance } from "fastify";
import { Author, authorModel } from "../models/author.model.js";
import { CreateAuthorDTO, FindAuthorDTO, UpdateAuthorDTO } from "../dto/author.dto.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";


export class AuthorService {
    private authorRepository = authorModel
    constructor(private readonly app: FastifyInstance) {
        
    }
    async CreateOneAuthor(body: CreateAuthorDTO) {
        const dto = plainToInstance(CreateAuthorDTO, body)
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }

        const author = new this.authorRepository({
            name: body.name,
            yearOfBirth: body.yearOfBirth
        })
        return await author.save()
    }
    async FindAllAuthors() {
        return ((await this.authorRepository.find()).map((element) => new FindAuthorDTO(element.id, element.name, element.yearOfBirth, element.createdAt, element.updatedAt)))
    }
    async FindOneAuthor(id: string) {
        const author = await this.authorRepository.findById(id)
        if (!author) {
            throw this.app.httpErrors.notFound("author wasn't found")
        }
        return new FindAuthorDTO(author.id, author.name, author.yearOfBirth, author.createdAt, author.updatedAt)
    }
    async UpdateOneAuthor(id: string, body: UpdateAuthorDTO) {
        await this.FindOneAuthor(id)
        const dto =  plainToInstance(UpdateAuthorDTO ,body)
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }

        await this.authorRepository.findByIdAndUpdate(id, body)

        return {
            message: "author was updated"
        }
    }
    async DeleteAuthor(id: string) {
        await this.FindOneAuthor(id)
        await this.authorRepository.findByIdAndDelete(id)
        return {
            message: "author was deleted"
        }
    }
}
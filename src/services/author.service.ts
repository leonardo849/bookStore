import { FastifyInstance } from "fastify";
import { Author, authorModel } from "../models/author.model.js";
import { CreateAuthorDTO, FindAuthorDTO } from "../dto/author.dto.js";
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
}
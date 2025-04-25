import fastify, { FastifyInstance } from "fastify"
import { Book, bookModel } from "../models/book.model.js"
import { CreateBookDTO } from "../dto/book.dto.js"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { AuthorService } from "./author.service.js"

export class BookService {
    private bookRepository = bookModel
    private authorService: AuthorService
    constructor(private readonly app: FastifyInstance) {
        this.authorService = new AuthorService(app)
    }
    async CreateBook(body: CreateBookDTO, file: Buffer) {
        const dto = plainToInstance(CreateBookDTO, body)
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }

        for (let authorID of dto.authorsIds) {
            let author = await this.authorService.FindOneAuthor(authorID)
            if (!author) {
                throw this.app.httpErrors.notFound(`author with id ${authorID} wasn't found`)
            }
        }

        const book = new this.bookRepository({
            authors: body.authorsIds,
            file: file,
            name: body.name,
            year: body.year
        })

        return await book.save()
    }
}
import fastify, { FastifyInstance } from "fastify"
import { Book, bookModel } from "../models/book.model.js"
import { CreateBookDTO, FindBookDTO, UpdateBookDTO } from "../dto/book.dto.js"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { AuthorService } from "./author.service.js"
import { FindAuthorDTO } from "../dto/author.dto.js"
import { Author } from "../models/author.model.js"

interface FindOneBook {
    id: string;
    name: string;
    year: number;
    authors: Author[]
    file: Buffer
    createdAt: Date
    updatedAt: Date
}

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
    async FindOneBook(id: string) {
        const book = await this.bookRepository.findById(id).populate("authors") as FindOneBook
        if (!book) {
            throw this.app.httpErrors.notFound("book was not found")
        }

        //@ts-ignore
        const authors = book.authors.map(element => new FindAuthorDTO(element.id, element.name, element.yearOfBirth, element.createdAt, element.updatedAt))

        return new FindBookDTO(book.id, book.name, book.year, authors, book.createdAt, book.file)
    }
    async FindBooks() {
        const books = (await this.bookRepository.find()).map(element => new FindBookDTO(element.id, element.name, element.year, element.authors, element.createdAt))
        return books
    }
    async UpdateBook(id: string, body: UpdateBookDTO) {
        const dto = plainToInstance(UpdateBookDTO, body)
        const errors = await validate(dto)
        if (errors.length > 0) {
            throw this.app.httpErrors.badRequest(`errors: ${errors}`)
        }
        await this.FindOneBook(id)
        await this.bookRepository.findByIdAndUpdate(id, body)
        return {
            "message": "book was updated"
        }
    }
    async DeleteBook(id: string) {
        await this.FindOneBook(id)
        await this.bookRepository.findByIdAndDelete(id)
        return {
            message: "book was deleted"
        }
    }
}
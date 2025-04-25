import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {  pipeline, Writable } from "stream";
import {once} from "events"
import { BookService } from "../services/book.service.js";
import { CreateBookDTO } from "../dto/book.dto.js";

export class BookController {
    bookService: BookService
    constructor(app: FastifyInstance) {
        this.bookService = new BookService(app)
    }
    async CreateBook(request: FastifyRequest, reply: FastifyReply) {
        const parts = request.parts()

        let pdfBuffer: Buffer | null = null;
        let bookData!: CreateBookDTO 

        for  await (let part of parts) {
            if (part.type === 'file' && part.fieldname === 'file') {
                if (part.mimetype !== 'application/pdf') {
                    return reply.status(400).send({message: "Only pdf's are allowed"})
                }
                const chunks: Buffer[] = []
                const writable = new Writable(
                    {
                        write(chunk, encoding, callback) {
                            chunks.push(chunk)
                            callback()
                        },
                    })
                
                part.file.pipe(writable)
                await once(writable, "finish")
                pdfBuffer = Buffer.concat(chunks)
            } else if (part.type === "field" && part.fieldname === "body") {
                try {
                    bookData = JSON.parse(part.value as string)
                } catch (error) {
                    return reply.status(400).send({message: "invalid json"})
                }
            }
        }

        if (!pdfBuffer) {
            reply.status(400).send({error: "where is the file, bro?"})
        }

        await this.bookService.CreateBook(bookData, pdfBuffer as Buffer<ArrayBufferLike>)
        reply.status(201).send({message: "book was created"})

    }
}
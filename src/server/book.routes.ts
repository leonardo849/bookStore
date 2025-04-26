import { FastifyInstance } from "fastify"
import { BookController } from "../controllers/book.controller.js"
import { ASetupRoutes } from "../types/abstract-class-route.js"

export class BookRoutes extends ASetupRoutes {
    private bookController: BookController
    constructor(app: FastifyInstance) {
        super(app)
        this.bookController = new BookController(app)
    }
    setupRoutes() {
        this.app.register(async bookApp => {
            bookApp.post("/create", this.bookController.CreateBook.bind(this.bookController))
            bookApp.get("/one/:id", this.bookController.FindOneBook.bind(this.bookController))
            bookApp.get("/all", this.bookController.FindBooks.bind(this.bookController))
            bookApp.put("/update/:id", this.bookController.UpdateBook.bind(this.bookController))
            bookApp.delete("/delete/:id", this.bookController.DeleteBook.bind(this.bookController))
        }, {prefix: "books"})
    }
}
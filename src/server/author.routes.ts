import { FastifyInstance } from "fastify";
import { ASetupRoutes } from "../types/abstract-class-route.js";
import { AuthorController } from "../controllers/author.controller.js";

export class AuthorRoutes extends ASetupRoutes {
    private authorController: AuthorController 
    constructor(app: FastifyInstance) {
        super(app)
        this.authorController = new AuthorController(app)
    }
    setupRoutes() {
        this.app.register(async (authorApp) => {
            authorApp.post("/create", this.authorController.CreateAuthor.bind(this.authorController))
            authorApp.get("/all", this.authorController.FindAllAuthors.bind(this.authorController))
            authorApp.get("/one/:id", this.authorController.FindOneAuthor.bind(this.authorController))
            authorApp.put("/update/:id", this.authorController.UpdateAuthor.bind(this.authorController))
            authorApp.delete("/delete/:id", this.authorController.DeleteAuthor.bind(this.authorController))
        }, {prefix: "/authors"})

        console.log("author's routes are working")
    }
}
import Fastify from "fastify"
import {Server} from "./server/server.js"
import sensible from '@fastify/sensible';
import multipart from '@fastify/multipart';



const app = Fastify()
await app.register(sensible)
await app.register(multipart)

const server = new Server(app)
server.RunServer(3000)

import Fastify from "fastify"
import {Server} from "./server/server.js"
import sensible from '@fastify/sensible';

const app = Fastify()
await app.register(sensible)
const server = new Server(app)
server.RunServer(3000)

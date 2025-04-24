import {connect, mongo} from "mongoose"

export class Database {
    constructor() {

    }
    public async ConnectToDB() {
        try {
            const mongourl = process.env.MONGO_URL
            if (!mongourl) {
                throw new Error("there isn't mongo url")
            }
            await connect(mongourl as string)
            console.log("connected to DB")
        } catch (error) {
            console.error("error while i was connecting to db:",error);
            process.exit(1);
        }
    }
}
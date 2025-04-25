import { IsNumber, IsString, Length, Max, Min } from "class-validator";
import { year } from "./author.dto.js";
import { IsMongoIDArray } from "./functions/ismongoID-array.js";

export class CreateBookDTO {
    @IsString()
    @Length(10, 50)
    name!: string

    @Max(year)
    @IsNumber()
    year!: number

    @IsMongoIDArray()
    authorsIds!: string[]
}
import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { FindAuthorDTO, year } from "./author.dto.js";
import { IsMongoIDArray } from "./functions/ismongoID-array.js";
import { Ref } from "@typegoose/typegoose";
import { Author } from "../models/author.model.js";

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

export class FindBookDTO {
    constructor(readonly id: string, readonly name: string, readonly year: number,   readonly authors: FindAuthorDTO[]|Ref<Author>[], readonly createdAt: Date, readonly file?: Buffer,) {

    }
}

export class UpdateBookDTO {
    @IsOptional()
    @IsString()
    @Length(10, 50)
    name?: string;

    @IsOptional()
    @Max(year)
    @IsNumber()
    year?: number

    constructor(name?: string, year?: number) {
        this.name = name
        this.year = year
    }
}


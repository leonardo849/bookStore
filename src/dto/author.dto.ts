import { Type } from "class-transformer";
import { IsDate,  IsNumber,  IsOptional,  IsString, Length, Max } from "class-validator";

export const year = new Date().getFullYear()

export class CreateAuthorDTO{
    @IsString()
    @Length(10, 100)
    name: string;

    @IsNumber()
    @Max(year - 13)
    yearOfBirth: number

    constructor(name: string, yearOfBith: number) {
        this.name = name
        this.yearOfBirth = yearOfBith
    }
}

export class UpdateAuthorDTO{
    @IsOptional()
    @IsString()
    @Length(10, 100)
    name?: string

    @IsOptional()
    @IsNumber()
    @Max(year - 13)
    yearOfBirth?: number

    constructor(name?: string, yearOfBith?: number) {
        this.name = name
        this.yearOfBirth = yearOfBith
    }
}


export class FindAuthorDTO {
    constructor(readonly id: string, readonly name: string, readonly yearOfBirth: number, readonly createdAt: Date, readonly updatedAt: Date) {}
}
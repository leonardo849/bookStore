import { getModelForClass, modelOptions, Prop, prop, Ref } from "@typegoose/typegoose";
import { Author } from "./author.model.js";

@modelOptions({schemaOptions: {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }}})
class Book {
    @prop({required: true})
    name!: string

    @prop({required: true})
    year!: number

    @prop({ref: () => Author, required: true})
    authors!: Ref<Author>[]

    @prop({type: Buffer})
    pdfData!: Buffer

    @Prop()
    createdAt!: Date

    @Prop()
    updatedAt!: Date

}

export const bookModel = getModelForClass(Book)
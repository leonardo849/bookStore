import { getModelForClass, modelOptions, Prop, prop } from "@typegoose/typegoose";


@modelOptions({schemaOptions: {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }}})
export class Author {
    @prop({required: true})
    name!: string;

    @prop({required: true})
    yearOfBirth!: number

    @Prop()
    createdAt!: Date

    @Prop()
    updatedAt!: Date
}

export const authorModel = getModelForClass(Author)